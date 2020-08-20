'use strict';
const log = require('log-to-file');
const fs = require('fs');
const path = require('path');
const paths = require('./paths');

require('dotenv').config();
const dotenv = require('dotenv');

const { resolve, join } = path;

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
	throw new Error(
		'The NODE_ENV environment variable is required but was not specified.'
	);
}

log(`NODE_ENV: ${NODE_ENV}`);

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
	`${paths.dotenv}.${NODE_ENV}.local`,
	`${paths.dotenv}.${NODE_ENV}`,
	// Don't include `.env.local` for `test` environment
	// since normally you expect tests to produce the same
	// results for everyone
	NODE_ENV !== 'test' && `${paths.dotenv}.local`,
	paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach((dotenvFile) => {
	if (fs.existsSync(dotenvFile)) {
		require('dotenv-expand')(
			require('dotenv').config({
				path: dotenvFile,
			})
		);
	}
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebook/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of webpack shims.
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
	.split(path.delimiter)
	.filter((folder) => folder && !path.isAbsolute(folder))
	.map((folder) => path.resolve(appDirectory, folder))
	.join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.
const REACT_APP = /^REACT_APP_/i;
// var NODE_ENV = process.env.NODE_ENV || 'development';

const currentDir = resolve(__dirname); // /mnt/d/Develop_Chrome_Extensions/applications/30-days-react/react-router-demo/config
const rootDir = join(currentDir, '..'); // /mnt/d/Develop_Chrome_Extensions/applications/30-days-react/react-router-demo

// console.log(`__dirname: ${__dirname}`);
// console.log(`currentDir: ${currentDir}`);
// console.log(`rootDir: ${rootDir}`);
// console.log(`join .env: ${join(rootDir, '.env')}`);
// console.log(`NODE_ENV: ${NODE_ENV}`);

// 1. Step one (loading the default .env file)
const globalDotEnv = dotenv.config({
	path: join(rootDir, '.env'), // /mnt/d/Develop_Chome_Extensions/applications/30-days-react/react-router-demo/.env
	silent: true, // If file isn't found, don't throw exception
});
// 2. Load the environment config
const envDotEnv = dotenv.config({
	path: join(currentDir, NODE_ENV + `.config.env`), // /mnt/d/Develop_Chrome_Extensions/applications/30-days-react/react-router-demo/development.config.env
	silent: true,
});
const allVars = Object.assign(
	{},
	{
		NODE_ENV: NODE_ENV, //development or production
	},
	globalDotEnv.parsed, // {"APP_NAME":"30days"}
	envDotEnv.parsed // TIME_SERVER='https://fullstacktime.herokuapp.com'
);

log('allVars:');
log(JSON.stringify(allVars));
// console.log(`globalDotEnv.parsed: ${JSON.stringify(globalDotEnv.parsed)}`);
// console.log(`envDotEnv.parsed: ${JSON.stringify(envDotEnv.parsed)}`);

function getClientEnvironment(publicUrl) {
	const raw = Object.keys(process.env)
		.filter((key) => REACT_APP.test(key))
		.reduce(
			(env, key) => {
				env[key] = process.env[key];
				return env;
			},
			{
				// Useful for determining whether we’re running in production mode.
				// Most importantly, it switches React into the correct mode.
				NODE_ENV: process.env.NODE_ENV || 'development',
				// Useful for resolving the correct path to static assets in `public`.
				// For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
				// This should only be used as an escape hatch. Normally you would put
				// images into the `src` and `import` them in code to get their paths.
				PUBLIC_URL: publicUrl,
				...allVars,
			}
		);
	// Stringify all values so we can feed into Webpack DefinePlugin
	const stringified = {
		'process.env': Object.keys(raw).reduce((env, key) => {
			env[key] = JSON.stringify(raw[key]);
			return env;
		}, {}),
	};

	return { raw, stringified };
}

module.exports = getClientEnvironment;
