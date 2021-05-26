import axios from 'axios';
import React, { useState } from 'react';
import BackEndUrl from '../RouteUrls';

// Importing all bootstrap components needed

import '../../css/LoginForm.css';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';

function LoginForm () {
	// The state for the form data

	const [ formData, setFormData ] = useState({
		email    : '',
		password : ''
	});

	// If the user does not have a valid input, the state is changed to tell the user what is wrong

	const [ invalidInput, setInvalidInput ] = useState('');

	// When the user types in the inputs, this is what function is called to change the state

	const handleChange = (e) => {
		const value = e.target.value;
		setFormData({
			...formData,
			[e.target.name]: value
		});
	};

	// Whent he user submits the form, this is called. This makes a post request to the back end to check if the form data was correct. If it is, it returns the user. It it is wrong, it will change the invalidInput State to let the user know it didnt work

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData['email'].length || !formData['password'].length) {
			setInvalidInput('Please Fill out all Inputs');
		}
		else {
			await axios
				.post(`${BackEndUrl}/auth/login`, formData)
				.then((res) => {
					if (res.data['user'].length > 0) {
						localStorage.setItem('user', res.data['user']);
						window.location.replace('/roadlist');
					}
				})
				.catch((err) => setInvalidInput('Email or Password is Incorrect'));
		}
	};

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				{/* {invalidInput.length ? <h3>{invalidInput}</h3> : <div className="validInput" />} */}
				<Jumbotron>
					{invalidInput.length ? <h3>{invalidInput}</h3> : <div className="validInput" />}
					<Form onSubmit={handleSubmit}>
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
						<Button onClick={handleSubmit}>Login</Button>
					</Form>
				</Jumbotron>
			</Col>
		</Row>
	);
}

export default LoginForm;
