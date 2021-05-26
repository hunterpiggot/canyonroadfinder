import React, { useEffect } from 'react';

function Home () {
	// This function only redirect to roadlist. In the future there will be a full home page when there is more roads and information to justify one
	useEffect(() => {
		const redirectRoadlist = () => {
			window.location.replace('/roadlist');
		};
		redirectRoadlist();
	});
	return <div className="Home" />;
}

export default Home;
