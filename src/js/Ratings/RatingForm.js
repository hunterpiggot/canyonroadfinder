import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

import BackEndUrl from '../RouteUrls';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

function RatingFrom ({ road_id }) {
	// All the form information
	const [ formData, setFromData ] = useState({
		road_id     : road_id,
		user_email  : localStorage.getItem('user'),
		overall     : '',
		difficulty  : '',
		description : ''
	});

	// When the user types in the inputs, this sees the change and updates the state
	const handleChange = (e) => {
		const val = e.target.value;
		setFromData({
			...formData,
			[e.target.name]: val
		});
	};
	// When the user submits the form, it make a post request to the database to reflect the changes. If it worked, it sets the state values to empty and reloads the page
	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post(`${BackEndUrl}/road/${road_id}/rating/create`, formData)
			.then((res) => res.data)
			.then((data) => {
				if (data['success'] === 'true') {
					setFromData({
						road_id     : road_id,
						user_email  : localStorage.getItem('user'),
						overall     : '',
						difficulty  : '',
						description : ''
					});
					window.location.replace(`/roads/${road_id}`);
				}
			});
	};

	return (
		<div
			style={{
				margin : '30px'
			}}
		>
			<h2>Leave a Review!</h2>
			<Form onSubmit={handleSubmit}>
				<Form.Row>
					<Form.Group as={Col} md="12">
						<Form.Label>Description</Form.Label>
						<Form.Control
							value={formData.description}
							name="description"
							onChange={handleChange}
							as="textarea"
							rows={3}
						/>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col} md="6">
						<Form.Label>Overall</Form.Label>
						<Form.Control name="overall" onChange={handleChange} as="select">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
						</Form.Control>
					</Form.Group>
					<Form.Group as={Col} md="6" controlId="exampleForm.ControlSelect1">
						<Form.Label>Difficulty</Form.Label>
						<Form.Control name="difficulty" onChange={handleChange} as="select">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
						</Form.Control>
					</Form.Group>
				</Form.Row>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
}

export default RatingFrom;
