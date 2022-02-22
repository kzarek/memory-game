import { createAction } from "redux-api-middleware"
import types from "./types";

export const getGamesList = () => {
	return createAction({
		endpoint: 'http://localhost:5000/gamerooms',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		types: [
			types.GAMES_LIST_REQUEST,
			types.GAMES_LIST_SUCCESS,
			types.GAMES_LIST_FAILURE
		]
	})
}

export const deleteGame = (gameId) => {
	return createAction({
		endpoint: 'http://localhost:5000/gamerooms/' + gameId,
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		types: [
			types.GAME_DELETE_REQUEST,
			{
				type: types.GAME_DELETE_SUCCESS,
				payload: gameId
			},
			types.GAME_DELETE_FAILURE
		]
	})
}

export const createGames = (newGame) => {
	return createAction({
		endpoint: 'http://localhost:5000/gamerooms',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newGame),
		types: [
			types.CREATE_GAME_REQUEST,
			types.CREATE_GAME_SUCCESS,
			types.CREATE_GAME_FAILURE
		]
	})
}

export const addPlayer = (gameId, playerId, players) => {
	if (players.length < 2 && players.filter(p => p.id === playerId).length === 0) {
		players.push({ id: playerId, points: 0, isReady: false })
		return createAction({
			endpoint: 'http://localhost:5000/gamerooms/' + gameId,
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ players: players }),
			types: [
				types.ADD_PLAYER_REQUEST,
				{
					type: types.ADD_PLAYER_SUCCESS,
					payload: [gameId, playerId]
				},
				types.ADD_PLAYER_FAILURE
			]
		})
	} else return createAction({})
}