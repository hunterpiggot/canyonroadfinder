import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackEndUrl from '../RouteUrls';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

function RoadCard ({ id, name, location, elevation_change, length, image, status }) {
	// This saves the users road statuses to state so they can change without a page reload
	const [ userRoadStatus, setUserRoadStatus ] = useState(status);

	// This function is called when a user adds a status to a road. It sees what is being changed and sends a post request to the database to reflect the changes. If the request worked, it changes the state and updates the page
	const addItem = async (e) => {
		const target = e.target.id;
		let data = {
			road_id    : id,
			user_email : localStorage.getItem('user'),
			status     : target
		};

		await axios.post(`${BackEndUrl}/road/userRoadList/add`, data).then((res) => res.data).then((data) => {
			if (data.status.length) {
				setUserRoadStatus([ ...userRoadStatus, target ]);
			}
		});
	};

	// This is the same as the other function but instead of adding, it removes the status

	const removeItem = async (e) => {
		const target = e.target.id;
		let data = {
			road_id    : id,
			user_email : localStorage.getItem('user'),
			status     : target
		};
		await axios.post(`${BackEndUrl}/road/userRoadList/remove`, data).then((res) => res.data).then((data) => {
			if (data.status.length) {
				const newStatus = [ ...userRoadStatus ];
				const index = userRoadStatus.indexOf(target);
				if (index !== -1) {
					newStatus.splice(index, 1);
					setUserRoadStatus(newStatus);
				}
			}
		});
	};

	return (
		<Col md={{ span: 4 }}>
			<Card style={{ maxWidth: '500px', marginBottom: '30px', marginTop: '10px' }}>
				<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.5.0/css/all.css" />
				<Link to={`/roads/${id}`}>
					<Card.Img style={{ height: '18rem' }} variant="top" src={image} />
				</Link>
				<Card.Body>
					<Link to={`/roads/${id}`}>
						<Card.Title>{name}</Card.Title>
						<Card.Text>{location}</Card.Text>
					</Link>
					<Card.Text>
						{userRoadStatus.includes('favorite') ? (
							<span style={{ marginRight: '10px' }} id="favorite-item" className="icon icon-default">
								<i id="favorite" onClick={removeItem} className="fas fa-star fa-fw fa-1x" />
							</span>
						) : (
							<span style={{ marginRight: '10px' }} id="favorite-item" className="icon icon-default">
								<i id="favorite" onClick={addItem} className="far fa-star" />
							</span>
						)}
						{userRoadStatus.includes('planned') ? (
							<span style={{ marginRight: '10px' }} id="planned-item" className="icon icon-default">
								<i id="planned" onClick={removeItem} className="fas fa-calendar-check" />
							</span>
						) : (
							<span style={{ marginRight: '10px' }} id="planned-item" className="icon icon-default">
								<i id="planned" onClick={addItem} className="far fa-calendar" />
							</span>
						)}
						{userRoadStatus.includes('driven') ? (
							<span style={{ marginRight: '10px' }} id="driven-item" className="icon icon-default">
								<i id="driven" onClick={removeItem} className="fas fa-check-circle" />
							</span>
						) : (
							<span style={{ marginRight: '10px' }} id="driven-item" className="icon icon-default">
								<i id="driven" onClick={addItem} className="far fa-check-circle" />
							</span>
						)}
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
}

export default RoadCard;
