import { useState, useEffect } from "react";
import Chat from "../Chat";
import { connect } from "react-redux"
import { useParams } from 'react-router-dom'
import { getOneGameById } from "../../ducks/games/selectors";
import SimpleGame from "./SimpleGame";
const mqtt = require('mqtt');
const axios = require('axios');



const Game = ({ getOneGameById, user, users }) => {
    const { id } = useParams();
    const [game, setGame] = useState("");
    const [tileId, setTileId] = useState(null);
    const [client, setClient] = useState(mqtt.connect('mqtt://localhost:8000/mqtt'));
    const [clientOn, setClientOn] = useState(false)
    const [userStartedGame, setUserStartedGame] = useState([])
    const [mqttSubscribed, setMqttSubscribed] = useState(false)
    console.log(id+ " ID")
    console.log("User logged now" + user)
    

    useEffect(() => {
        axios.get(`http://localhost:5000/gamerooms/${id}`)
            .then(function (response) {
                console.log(response)
                setGame(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

        if (client) {
            if (clientOn === false) {
                client.on('message', (topic, mess) => {
                    switch (topic) {
                        case `gameroom/${id}/gameStarted`:
                            return handleGameStarted(mess)
                        case `gameroom/${id}/nextTurn`:
                            return handleNextTurn(mess)
                        case `gameroom/${id}/end`:
                            return handleEnd(mess)
                        default:
                            console.log("No handler for topic")
                    }
                })

                if (mqttSubscribed === false) {
                    client.subscribe(`gameroom/${id}/gameStarted`)
                    client.subscribe(`gameroom/${id}/nextTurn`)
                    client.subscribe(`gameroom/${id}/end`)

                    setMqttSubscribed(true)
                }
                setClientOn(true)
            }
        } else {
            setClient(mqtt.connect("mqtt://localhost:8000/mqtt"))
            console.log("game connected")
        }

        const handleGameStarted = (mess) => {
           
            var message = JSON.parse(mess)
            var player1 = message.player1
            var player2 = message.player2
            console.log(" player1: " +player1 + " player2 "+ player2)
            console.log(users)
            if(game){
                console.log(game.name)
            }
           
            alert("Game is now started, begins" )
           
        }

        const handleNextTurn = (mess) => {
            //const nextPlayerId = JSON.parse(mess).nextPlayerId
            //
            //
            //
        }

        const handleEnd = (mess) => {
            //const winnerId = JSON.parse(mess).winnerId
            //
            //
            //
        }
    }, [])

    const userStartGame = () => {
        client.publish(`gameroom/startGame`, JSON.stringify({ gameroomId: id, playerId: user._id }))
    }

   
    return (
        
        <div className="GameRoom">
            {game && (  <div className="GameAndChat">
                <div className="Game">
                    <SimpleGame/>
                </div>
                <div className="ChatAndButton">
                    <div className="GameChat">
                        <Chat />
                    </div>
                    <button onClick={() => userStartGame()}>Rozpocznij gre</button>
                </div>

            </div>)}
          
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        games: state.games.games,
        user: state.users.currentlyLoged[0],
        users: state.users.users
    }
}

const mapDispatchToProps = {
    getOneGameById
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
