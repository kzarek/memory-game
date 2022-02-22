import { Link } from "react-router-dom";
import CommentForm from "./comments/CommentForm";
import Comments from "./comments/Comments";
import { useState, useEffect } from "react"
import { useCookies } from 'react-cookie';

const mqtt = require('mqtt');
const FrontPage = () => {
    const [client, setClient] = useState(mqtt.connect('mqtt://localhost:8000/mqtt'));
    const [clientOn, setClientOn] = useState(false)
    const [mqttSubscribed, setMqttSubscribed] = useState(false)
	const [cookies, setCookie] = useCookies(['name']);

    useEffect(() => {
        if (client) {
            if (clientOn === false) {
                client.on('message', (topic, mess) => {
                    switch (topic) {
                        default:
                            console.log("No handler for topic")
                    }
                })

                if (mqttSubscribed === false) {
                    setMqttSubscribed(true)
                }
                setClientOn(true)
            }
        } else {
            setClient(mqtt.connect("mqtt://localhost:8000/mqtt"))
            console.log("game connected")
        }
        if (!cookies.userCountState) {
            client.publish("userCount", "")
            setCookie('userCountState', true, { path: '/' })
        } else {
            //client.publish("getUserCount", "")
        }
    }, [])


    return (
        <div className="FrontPage">
            <div> Witamy! Zaloguj się aby móc rozpocząć grę </div>
            <Link to="/login"> <button> Zaloguj się </button></Link>
            <div> Nie masz konta? </div>
            <Link to="/register"> <button> Zarejestruj się </button></Link>
            <div>Podobała ci się nasza gra? Zostaw komentarz !</div>
            <CommentForm />
            <Comments />
        </div>

    )






}
export default FrontPage