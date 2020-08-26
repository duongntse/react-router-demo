import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogout } from './redux/actions/auth';

import Navbar from './components/Nav/Navbar';

// We'll load our views from the `src/views`
// directory
import Home from './views/Home/Home';
import About from './views/About/About';
import Login from './views/Login/Login';

import Clock from './views/Timezone/Clock';
import ClockAnalog from './views/Timezone/ClockAnalog';
import ServerTime from './views/ServerTime';

class App extends Component {
	render() {
		return (
			<>
				<div className='app'>
					<h1>This is Duongntse App.</h1>
					<ServerTime />
					<div
						style={{
							position: 'absolute',
							right: '10px',
							top: '10px',
						}}>
						<ClockAnalog
							size={200}
							timeFormat='24hour'
							hourFormat='standard'
						/>
					</div>
					<Clock />
					<Router>
						<div>
							<Navbar {...this.props} />
							<Switch>
								<Route
									path='/login'
									render={(props) => (
										<Login
											{...props}
											{...this.props}></Login>
									)}
								/>
								<Route
									path='/about'
									render={(props) => (
										<About
											{...props}
											{...this.props}></About>
									)}
								/>
								<Route
									path='/'
									render={(props) => (
										<Home {...props} {...this.props}></Home>
									)}
								/>
							</Switch>
						</div>
					</Router>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(tryLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
