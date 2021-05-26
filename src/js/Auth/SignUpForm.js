import axios from 'axios';
import React, { useState } from 'react';

import BackEndUrl from '../RouteUrls';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';

function SignUpForm () {
	// This state hold all of the form information
	const [ formData, setFormData ] = useState({
		name     : '',
		email    : '',
		password : ''
	});
	// This state will change if the user has put in invalid information
	const [ invalidInput, setInvalidInput ] = useState('');

	// When the user puts text in the input, this is what will update the state to reflect the information
	const handleChange = (e) => {
		const value = e.target.value;
		setFormData({
			...formData,
			[e.target.name]: value
		});
	};
	// When the user submits the form, this funtion is called. It checks to see if the inputs are filled, if not, it changes the invalidInput state. If it is filled out, it sends a post request to the back end. This will create the user. If it is a valid email, it will redirect them to the roadlist page. If it is not a valid email, it will change the invalidInput state.
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData['name'].length || !formData['email'] || !formData['password']) {
			setInvalidInput('Please Fill out all inputs');
		}
		else {
			await axios
				.post(`${BackEndUrl}/auth/signup`, formData)
				.then(() => {
					window.location.replace('/roadlist');
					localStorage.setItem('user', formData.email);
					if (localStorage.getItem('location')) {
						localStorage.removeItem('location');
					}
				})
				.catch((err) => setInvalidInput('Email Taken'));
		}
	};

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Jumbotron>
					{invalidInput.length ? <h3>{invalidInput}</h3> : <div className="validInput" />}
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formGroupEmail">
							<Form.Label>Name</Form.Label>
							<Form.Control
								onChange={handleChange}
								name="name"
								value={formData.name}
								type="text"
								placeholder="Enter Name"
							/>
						</Form.Group>
						<Form.Group controlId="formGroupEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								onChange={handleChange}
								name="email"
								value={formData.email}
								type="email"
								placeholder="Enter email"
							/>
						</Form.Group>
						<Form.Group controlId="formGroupPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								onChange={handleChange}
								name="password"
								value={formData.password}
								type="password"
								placeholder="Password"
							/>
						</Form.Group>
						<Button onClick={handleSubmit}>Sign Up</Button>
					</Form>
				</Jumbotron>
			</Col>
		</Row>
	);
}

export default SignUpForm;
