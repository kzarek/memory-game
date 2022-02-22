import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

const mqtt = require('mqtt');
const Navbar = (user, users) => {
	const [client, setClient] = useState(mqtt.connect('mqtt://localhost:8000/mqtt'));
	const [clientOn, setClientOn] = useState(false)
	const [mqttSubscribed, setMqttSubscribed] = useState(false)
	const [userCount, setUserCount] = useState(0)
	const [checkAdmin, setCheckAdmin] = useState(false)

	useEffect(() => {
		if (user) {
			// console.log(user.user)
			if (user.user.isAdmin == true) {
				setCheckAdmin(true)
			}
			else {
				setCheckAdmin(false)
			}
		}
	}, [user])

	useEffect(() => {
		if (client) {
			if (clientOn === false) {
				client.on('message', (topic, mess) => {
					switch (topic) {
						case "userCount/result":
							return handleUserCount(mess)
						default:
							console.log("No handler for topic")
					}
				})

				if (mqttSubscribed === false) {
					client.subscribe("userCount/result")
					setMqttSubscribed(true)
				}
				setClientOn(true)
			}
		} else {
			setClient(mqtt.connect("mqtt://localhost:8000/mqtt"))
			console.log("game connected")
		}

		function handleUserCount(mess) {
			setUserCount(JSON.parse(mess))
		}
	}, [userCount])





	return (
		<div className="Navbar">
			<div><Link to="/">strona główna</Link></div>
			<div><Link to="/activeGames">activeGames</Link></div>
			<div><Link to="/userPage">userPage</Link></div>
			{checkAdmin && (<div>
				<div><Link to="/userList">userList</Link></div>
			</div>)}
			<div>Tyle osób odwiedziło naszą strone: {userCount} </div>

		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.users.currentlyLoged[0],
		users: state.users.users
	};
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
