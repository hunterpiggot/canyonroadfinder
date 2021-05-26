import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavBar () {
	// This state and use effect checks if a user is logged in. If they are, it changes the nav bar to not say login/signup and allow them to logout or view their profile

	const [ isLoggedIn, setIsLoggedIn ] = useState(false);
	useEffect(() => {
		const checkLoggedIn = () => {
			if (localStorage.getItem('user')) {
				setIsLoggedIn(true);
			}
		};
		checkLoggedIn();
	}, []);
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Brand href="/roadlist">Road List</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="/map">Map</Nav.Link>
				</Nav>
				{isLoggedIn ? (
					<Nav>
						<Nav.Link href={`/profile/${localStorage.getItem('user')}`}>
							{localStorage.getItem('user')}
						</Nav.Link>
						<Nav.Link href="/logout">Log Out</Nav.Link>
					</Nav>
				) : (
					<Nav>
						<Nav.Link href="/login">Login</Nav.Link>
						<Nav.Link eventKey={2} href="/signup">
							Sign Up
						</Nav.Link>
					</Nav>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
}

export default NavBar;
