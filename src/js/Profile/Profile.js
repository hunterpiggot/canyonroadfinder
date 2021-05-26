import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BackEndUrl from '../RouteUrls';
import RoadCard from '../RoadList/RoadCard';
import '../../css/Profile.css';

import EditProfileForm from '../Auth/EditProfileForm';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Profile () {
	// The user information
	const [ userInfo, setUserInfo ] = useState({});
	// All of their favorited roads
	const [ userFavoriteRoads, setUserFavoriteRoads ] = useState([]);
	// All of their planned roads
	const [ userPlannedRoads, setUserPlannedRoads ] = useState([]);
	// All of their driven roads
	const [ userDrivenRoads, setUserDrivenRoads ] = useState([]);
	// This will change depending on the tab the user is on, default is favorite
	const [ status, setStatus ] = useState('favorite');
	// This will change if the user is trying to edit their profile
	const [ editProfile, setEditProfile ] = useState(false);
	// This stores all of the users road statuses
	const [ userRoadStatus, setUserRoadStatus ] = useState([]);

	const { user } = useParams();
	useEffect(
		() => {
			// get request to get the users information and saves it to state
			const userDetails = async () => {
				const userDetails = await axios.get(`${BackEndUrl}/users/${user}`);
				// console.log(userDetails.data);
				setUserInfo(userDetails.data);
			};
			// Gets the users road statuses
			const getUsersTaggedRoads = async () => {
				const res = await axios(`${BackEndUrl}/users/${localStorage.getItem('user')}/roads`);
				setUserRoadStatus(res.data.roads);
			};
			// Gets all of the users road statuses. For every road, it gets the road and saves the information to state
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

	// This is called with a list of road to render all of the raod cards

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
	// When the user changes tab, this will call the road cards with the correct roads as a list
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
	// This functino is called when the user hits the edit button, changes the state and if this is true, it renders the edit profile form
	const renderEditProfile = () => {
		editProfile ? setEditProfile(false) : setEditProfile(true);
	};
	return (
		<div>
			<h1 style={{ marginBottom: '30px' }}>Profile</h1>
			<Row>
				<Col md={{ span: 3, offset: 1 }}>
					<Card>
						<Card.Body>
							<Card.Title>{userInfo.name}</Card.Title>
							<Card.Text>
								<b>Email: </b>
								{userInfo.email}
							</Card.Text>
							<Card.Text>
								<b>Favorite Roads: </b>
								{userFavoriteRoads.length}
							</Card.Text>
							<Card.Text>
								<b>Planned Roads: </b>
								{userPlannedRoads.length}
							</Card.Text>
							<Card.Text>
								<b>Driven Roads: </b>
								{userDrivenRoads.length}
							</Card.Text>
							{localStorage.getItem('user') === userInfo['email'] ? (
								<Button variant="primary" onClick={renderEditProfile}>
									Edit Profile
								</Button>
							) : (
								<div />
							)}
							{/* <Button variant="primary" onClick={renderEditProfile}>
								Edit Profile
							</Button> */}
							<Card.Text>{editProfile ? <EditProfileForm /> : <div />}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={{ span: 7, offset: 0 }}>
					<Tabs id="controlled-tab-example" activeKey={status} onSelect={(k) => setStatus(k)}>
						<Tab eventKey="favorite" title="Favorite">
							<Row>
								<Col>
									<CardDeck>{renderStatus()}</CardDeck>
								</Col>
							</Row>
						</Tab>
						<Tab eventKey="planned" title="Planned">
							<Row>
								<Col>
									<CardDeck>{renderStatus()}</CardDeck>{' '}
								</Col>
							</Row>
						</Tab>
						<Tab eventKey="driven" title="Driven">
							<Row>
								<Col>
									<CardDeck>{renderStatus()}</CardDeck>{' '}
								</Col>
							</Row>
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</div>
	);
}

export default Profile;
