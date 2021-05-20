import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BackEndUrl from '../RouteUrls';
import RoadCard from '../RoadList/RoadCard';
import '../../css/Profile.css';

import EditProfileForm from '../Auth/EditProfileForm';

function Profile () {
	const [ userInfo, setUserInfo ] = useState({});
	const [ userFavoriteRoads, setUserFavoriteRoads ] = useState([]);
	const [ userPlannedRoads, setUserPlannedRoads ] = useState([]);
	const [ userDrivenRoads, setUserDrivenRoads ] = useState([]);
	const [ status, setStatus ] = useState('planned');
	const [ editProfile, setEditProfile ] = useState(false);
	const [ userRoadStatus, setUserRoadStatus ] = useState([]);
	const [ buttonStyle, setButtonStyle ] = useState({
		b1 : '#303030',
		b2 : '#414141',
		b3 : '#414141'
	});

	const { user } = useParams();
	useEffect(
		() => {
			const userDetails = async () => {
				const userDetails = await axios.get(`${BackEndUrl}/users/${user}`);
				setUserInfo(userDetails.data);
			};
			const getUsersTaggedRoads = async () => {
				const res = await axios(`${BackEndUrl}/users/${localStorage.getItem('user')}/roads`);
				setUserRoadStatus(res.data.roads);
			};
			const userRoads = async () => {
				const userRoads = await axios.get(`${BackEndUrl}/users/${user}/roads`);
				let favoriteRoadsList = [];
				let plannedRoadsList = [];
				let drivenRoadsList = [];
				for (let i of userRoads.data['roads']) {
					let statusArr = i.status.split(', ');
					if (statusArr.includes('driven')) {
						drivenRoadsList.push(i);
					}
					if (statusArr.includes('planned')) {
						plannedRoadsList.push(i);
					}
					if (statusArr.includes('favorite')) {
						favoriteRoadsList.push(i);
					}
				}
				let favoriteRoads = [];
				for (let road of favoriteRoadsList) {
					const roadDetails = await axios.get(`${BackEndUrl}/road/${road.road_id}`);
					favoriteRoads.push(roadDetails.data);
				}
				let plannedRoads = [];
				for (let road of plannedRoadsList) {
					const roadDetails = await axios.get(`${BackEndUrl}/road/${road.road_id}`);
					plannedRoads.push(roadDetails.data);
				}
				let drivenRoads = [];
				for (let road of drivenRoadsList) {
					const roadDetails = await axios.get(`${BackEndUrl}/road/${road.road_id}`);
					drivenRoads.push(roadDetails.data);
				}
				setUserFavoriteRoads(favoriteRoads);
				setUserDrivenRoads(drivenRoads);
				setUserPlannedRoads(plannedRoads);
			};
			getUsersTaggedRoads();
			userDetails();
			userRoads();
		},
		[ user ]
	);

	const renderRoadCards = (roads) => {
		const roadList = roads.map((r) => {
			let status = [];
			for (let road of userRoadStatus) {
				if (road['road_id'] === r.id) {
					status = road['status'].split(', ');
				}
			}
			return (
				<RoadCard
					key={r.id}
					id={r.id}
					name={r.name}
					location={r.location}
					elevation_change={r.elevation_change}
					length={r.length}
					image={r.image}
					status={status}
				/>
			);
		});
		return roadList;
	};
	const renderStatus = () => {
		if (status === 'planned') {
			return renderRoadCards(userPlannedRoads);
		}
		else if (status === 'driven') {
			return renderRoadCards(userDrivenRoads);
		}
		else {
			return renderRoadCards(userFavoriteRoads);
		}
	};

	const changeStatusPlanned = () => {
		const newState = {
			b1 : '#303030',
			b2 : '#414141',
			b3 : '#414141'
		};
		setButtonStyle(newState);
		setStatus('planned');
	};
	const changeStatusFavorite = () => {
		const newState = {
			b1 : '#414141',
			b2 : '#303030',
			b3 : '#414141'
		};
		setButtonStyle(newState);
		setStatus('favorite');
	};
	const changeStatusDriven = () => {
		const newState = {
			b1 : '#414141',
			b2 : '#414141',
			b3 : '#303030'
		};
		setButtonStyle(newState);
		setStatus('driven');
	};

	const renderEditProfile = () => {
		editProfile ? setEditProfile(false) : setEditProfile(true);
	};
	return (
		<div>
			<h1>Profile</h1>

			<div className="Profile-UserInfo">
				<p id="user-name">{userInfo.name}</p>
				<p id="user-email">{userInfo.email}</p>
				<p>Planned Roads: {userPlannedRoads.length}</p>
				<p>Favorite Roads: {userFavoriteRoads.length}</p>
				<p>Driven Roads: {userDrivenRoads.length}</p>
				<button onClick={renderEditProfile}>Edit Profile</button>
				{editProfile ? <EditProfileForm /> : <div />}
			</div>
			<div className="Roads-Buttons">
				<div id="Status-Buttons">
					<button
						style={{ backgroundColor: buttonStyle['b1'] }}
						className="status-button"
						id="planned-button"
						onClick={changeStatusPlanned}
					>
						Planned
					</button>
					<button
						style={{ backgroundColor: buttonStyle['b2'] }}
						className="status-button"
						id="favorite-button"
						onClick={changeStatusFavorite}
					>
						Favorite
					</button>
					<button
						style={{ backgroundColor: buttonStyle['b3'] }}
						className="status-button"
						id="driven-button"
						onClick={changeStatusDriven}
					>
						Driven
					</button>
				</div>
				<div className="roads">{renderStatus()}</div>
			</div>
		</div>
	);
}

export default Profile;
