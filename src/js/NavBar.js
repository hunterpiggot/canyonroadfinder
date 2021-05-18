import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavBar () {
	const [ isLoggedIn, setIsLoggedIn ] = useState(false);
	useEffect(() => {
		const checkLoggedIn = () => {
			console.log('HERE');
			if (localStorage.getItem('user')) {
				setIsLoggedIn(true);
			}
		};

		checkLoggedIn();
	}, []);
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Brand href="/">Home</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="/map">Map</Nav.Link>
					<Nav.Link href="/roadlist">Road List</Nav.Link>
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
