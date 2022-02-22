const express = require('express');
const cors = require('cors')
const mqtt = require('mqtt')
const mongoose = require('mongoose');
const gamerooms = require('./routes/gamerooms');
const Gameroom = require('./models/Gameroom');
const users = require('./routes/users');
const comments = require('./routes/comments');

const app = express();

app.use(express.json())
app.use(cors())
app.use('/gamerooms', gamerooms);
app.use('/users', users);
app.use('/comments', comments);

require('dotenv').config();
const dbConnData = {
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || 'local'
};

mongoose
    .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(response => {
        console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)

        const port = process.env.PORT || 5000
        var userCount = 0;
        app.listen(port, () => {
            console.log(`API server listening at http://localhost:${port}`);
        });

        const client = mqtt.connect('mqtt://localhost:1883/mqtt')

        client.on('connect', () => {
            client.subscribe('game/pickTiles')
            client.subscribe(`gameroom/startGame`)
            client.subscribe('userCount')
            client.subscribe('getUserCount')
            console.log("mqtt connected")
        })

        client.on('message', (topic, mess) => {
            switch (topic) {
                case 'game/pickTiles':
                    handlePickTiles(mess)

                case 'gameroom/startGame':
                    handleStartGame(mess)

                case 'getUserCount':
                    getUserCount()

                case 'userCount':
                    handleUserCount(mess)

                default:
                    console.log("no handler for this topic" + topic)
            }
        })

        async function getUserCount() {
            console.log(userCount)
            client.publish('userCount/result', JSON.stringify(userCount))
        }

        async function handleUserCount(mess) {
            userCount += 1
            client.publish('userCount/result', JSON.stringify(userCount))
        }

        async function handleStartGame(mess) {
            var message = JSON.parse(mess)
            var gameroomId = message.gameroomId
            var playerId = message.playerId

            var updatedGameroom = await Gameroom.findById(gameroomId);
            var readyPlayerIndex = updatedGameroom.players.map(p => p.id).indexOf(playerId)
            console.log(updatedGameroom.players, playerId, readyPlayerIndex)

            if (readyPlayerIndex !== -1) {
                updatedGameroom.players[readyPlayerIndex].isReady = true

                if (updatedGameroom.players.filter(p => p.isReady).length === 2) {
                    console.log("We did it", gameroomId)

                    client.publish(`gameroom/${gameroomId}/gameStarted`, JSON.stringify({ player1: updatedGameroom.players[0].id, player2: updatedGameroom.players[1].id }))
                }
                await Gameroom.replaceOne({ _id: updatedGameroom._id }, updatedGameroom)
            }
        }

        async function handlePickTiles(mess) {
            var message = JSON.parse(mess)
            var gameroomId = message.gameroomId
            var currentPlayerId = message.currentPlayerId
            var pickedTileIds = message.pickedTileIds

            var gameroom = await Gameroom.findById(gameroomId)
            if (gameroom.currentPlayerId === currentPlayerId) {
                var pickedTiles = gameroom.tiles.filter(t => pickedTileIds.include(t.id))

                if (pickedTiles[0].value === pickedTiles[1].value) {
                    var updatedGameroom = gameroom
                    updatedGameroom.tiles[pickedTileIds[0]].isPicked = true
                    updatedGameroom.tiles[pickedTileIds[1]].isPicked = true
                    updatedGameroom.players[currentPlayerId].points += 1

                    if (updatedGameroom.tiles.filter(t => t.isPicked === false).length === 0) {
                        var winner = updatedGameroom.players.reduce(function (prev, curr) {
                            return prev.points > curr.points ? prev : curr
                        })
                        updatedGameroom.isActive = false
                        client.publish(`gameroom/${gameroomId}/end`, JSON.stringify({ winnerId: winner._id }))
                    } else {
                        client.publish(`gameroom/${gameroomId}/nextTurn`, JSON.stringify({ nextPlayerId: currentPlayerId }))
                    }
                    await Gameroom.replaceOne({ _id: updatedGameroom._id }, updatedGameroom)
                } else {
                    var otherPlayerId = gameroom.players.find(p => p._id !== currentPlayerId)._id
                    client.publish(`gameroom/${gameroomId}/nextTurn`, JSON.stringify({ nextPlayerId: otherPlayerId }))
                }
            }
        }
    })
    .catch(error => console.error('Error connecting to MongoDB', error));