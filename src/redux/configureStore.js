import { createStore, applyMiddleware } from 'redux';
import { rootReducer, initialState } from './reducers';
import loggingMiddleware from './middlewares/loggingMiddleWare';
import apiMiddleware from './middlewares/apiMiddleWare';
// ...
let middleware = [loggingMiddleware, apiMiddleware];
if ('development' === process.env.NODE_ENV) {
	middleware.unshift(loggingMiddleware);
}
export const configureStore = () => {
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(loggingMiddleware, apiMiddleware)
	);

	return store;
};
