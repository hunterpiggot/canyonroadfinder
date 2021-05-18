import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

	const favoriteItem = async () => {
		let data = {
			road_id    : id,
			user_email : localStorage.getItem('user'),
			status     : 'favorite'
		};
		await axios.post(`${BackEndUrl}/road/userRoadList/add`, data).then((res) => res.data).then((data) => {
			if (data.status.length) {
				setUserRoadStatus([ ...status, 'favorite' ]);
			}
		});
	};
	const drivenItem = async () => {
		let data = {
			road_id    : id,
			user_email : localStorage.getItem('user'),
			status     : 'driven'
		};
		await axios.post(`${BackEndUrl}/road/userRoadList/add`, data).then((res) => res.data).then((data) => {
			if (data.status.length) {
				setUserRoadStatus([ ...status, 'driven' ]);
			}
		});
	};
	const plannedItem = async () => {
		let data = {
			road_id    : id,
			user_email : localStorage.getItem('user'),
			status     : 'planned'
		};
		await axios.post(`${BackEndUrl}/road/userRoadList/add`, data).then((res) => res.data).then((data) => {
			if (data.status.length) {
				setUserRoadStatus([ ...status, 'planned' ]);
			}
		});
	};
	const removeFavoriteItem = async () => {
		let data = {
			road_id    : id,
			user_email : localStorage.getItem('user'),
			status     : 'favorite'
		};
		await axios.post(`${BackEndUrl}/road/userRoadList/remove`, data).then((res) => res.data).then((data) => {
			if (data.status.length) {
				const newStatus = [ ...status ];
				const index = userRoadStatus.indexOf('favorite');
				newStatus.splice(index, 1);
				setUserRoadStatus(newStatus);
			}
		});
	};
	const removeDrivenItem = async () => {
		let data = {
			road_id    : id,
			user_email : localStorage.getItem('user'),
			status     : 'driven'
		};
		await axios.post(`${BackEndUrl}/road/userRoadList/remove`, data).then((res) => res.data).then((data) => {
			if (data.status.length) {
				const newStatus = [ ...status ];
				const index = userRoadStatus.indexOf('driven');
				newStatus.splice(index, 1);
				setUserRoadStatus(newStatus);
			}
		});
	};
	const removePlannedItem = async () => {
		let data = {
			road_id    : id,
			user_email : localStorage.getItem('user'),
			status     : 'planned'
		};
		await axios.post(`${BackEndUrl}/road/userRoadList/remove`, data).then((res) => res.data).then((data) => {
			if (data.status.length) {
				const newStatus = [ ...status ];
				const index = userRoadStatus.indexOf('planned');
				newStatus.splice(index, 1);
				setUserRoadStatus(newStatus);
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
				{/* <a href="#" className="toggle-info btn">
					<span className="left" />
					<span className="right" />
				</a> */}
				<h2>
					{userRoadStatus.includes('favorite') ? (
						<a
							onClick={removeFavoriteItem}
							id="favorite-item"
							className="star-rating toggle-icons toggle-info"
						>
							<span className="icon icon-default">
								<i className="fas fa-star fa-fw fa-1x" />
							</span>
						</a>
					) : (
						<a onClick={favoriteItem} id="favorite-item" className="star-rating toggle-icons toggle-info">
							<span className="icon icon-default">
								<i class="far fa-star" />
							</span>
						</a>
					)}
					{userRoadStatus.includes('planned') ? (
						<a
							onClick={removePlannedItem}
							id="planned-item"
							className="star-rating toggle-icons toggle-info"
						>
							<span className="icon icon-default">
								<i class="fas fa-calendar-check" />
							</span>
						</a>
					) : (
						<a onClick={plannedItem} id="planned-item" className="star-rating toggle-icons toggle-info">
							<span className="icon icon-default">
								<i class="far fa-calendar" />
							</span>
						</a>
					)}
					{userRoadStatus.includes('driven') ? (
						<a onClick={removeDrivenItem} id="driven-item" className="star-rating toggle-icons toggle-info">
							<span className="icon icon-default">
								<i class="fas fa-check-circle" />
							</span>
						</a>
					) : (
						<a onClick={drivenItem} id="driven-item" className="star-rating toggle-icons toggle-info">
							<span className="icon icon-default">
								<i class="far fa-check-circle" />
							</span>
						</a>
					)}

					{name}
					<small>{location}</small>
				</h2>
			</div>
		</div>
	);
}

export default RoadCard;
