import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/RoadCard.css';
import BackEndUrl from '../RouteUrls';

function RoadCard ({ id, name, location, elevation_change, length, image, status }) {
	const [ isShowing, setIsShowing ] = useState('card showing');
	const [ userRoadStatus, setUserRoadStatus ] = useState(status);

	const showDetails = () => {
		if (isShowing === 'card showing') {
			setIsShowing('card show');
		}
		else {
			setIsShowing('card showing');
		}
	};

	const addItem = async (e) => {
		const target = e.target.id;
		let data = {
			road_id    : id,
			user_email : localStorage.getItem('user'),
			status     : target
		};
		await axios.post(`${BackEndUrl}/road/userRoadList/add`, data).then((res) => res.data).then((data) => {
			if (data.status.length) {
				console.log();
				setUserRoadStatus([ ...userRoadStatus, target ]);
			}
		});
	};

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
		<div onClick={showDetails} className={isShowing}>
			<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.5.0/css/all.css" />
			<Link to={`/roads/${id}`}>
				<div className="card__image-holder">
					<img className="card__image" src={image} alt="wave" />
				</div>
			</Link>
			<div className="card-title">
				<div id="name-location">
					<div id="name">{name}</div>
					<small id="location">{location}</small>
				</div>
				{userRoadStatus.includes('favorite') ? (
					<div onClick={removeItem} id="favorite-item" className="star-rating toggle-icons toggle-info">
						<span className="icon icon-default">
							<i id="favorite" className="fas fa-star fa-fw fa-1x" />
						</span>
					</div>
				) : (
					<div onClick={addItem} id="favorite-item" className="star-rating toggle-icons toggle-info">
						<span className="icon icon-default">
							<i id="favorite" className="far fa-star" />
						</span>
					</div>
				)}
				{userRoadStatus.includes('planned') ? (
					<div onClick={removeItem} id="planned-item" className="star-rating toggle-icons toggle-info">
						<span className="icon icon-default">
							<i id="planned" className="fas fa-calendar-check" />
						</span>
					</div>
				) : (
					<div onClick={addItem} id="planned-item" className="star-rating toggle-icons toggle-info">
						<span className="icon icon-default">
							<i id="planned" className="far fa-calendar" />
						</span>
					</div>
				)}
				{userRoadStatus.includes('driven') ? (
					<div onClick={removeItem} id="driven-item" className="star-rating toggle-icons toggle-info">
						<span className="icon icon-default">
							<i id="driven" className="fas fa-check-circle" />
						</span>
					</div>
				) : (
					<div onClick={addItem} id="driven-item" className="star-rating toggle-icons toggle-info">
						<span className="icon icon-default">
							<i id="driven" className="far fa-check-circle" />
						</span>
					</div>
				)}
			</div>
		</div>
	);
}

export default RoadCard;
