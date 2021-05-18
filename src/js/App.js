import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import Home from './Home';
import Map from './Map/Map';
import RoadList from './RoadList/RoadList';
import RoadDescription from './RoadDescription/RoadDescription';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Logout from './Auth/Logout';
import Profile from './Profile/Profile';

function App () {
	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<main>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/map">
							<Map />
						</Route>
						<Route exact path="/roadlist">
							<RoadList />
						</Route>
						<Route exact path="/roads/:id">
							<RoadDescription />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/signup">
							<SignUp />
						</Route>
						<Route exact path="/logout">
							<Logout />
						</Route>
						<Route path="/profile/:user">
							<Profile />
						</Route>
					</Switch>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
