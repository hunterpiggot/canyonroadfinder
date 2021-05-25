import React, { useEffect } from 'react';

function Home () {
	useEffect(() => {
		const redirectRoadlist = () => {
			window.location.replace('/roadlist');
		};
		redirectRoadlist();
	});
	return <div className="Home" />;
}

export default Home;
