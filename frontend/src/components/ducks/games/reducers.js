import types from "./types";

const initState = {
	games: [],
	loading: false,
	error: ''
}

export const gamesReducer = (state = initState, action) => {
	switch (action.type) {
		case types.GAMES_LIST_REQUEST:
			return { ...state, loading: true }

		case types.GAMES_LIST_SUCCESS:
			console.log(action.payload)
			return { ...state, games: [...action.payload], loading: false }

		case types.GAMES_LIST_FAILURE:
			alert(action.payload)
			return { ...state, loading: false, error: action.payload }

		case types.CREATE_GAME_REQUEST:
			return { ...state, loading: true }

		case types.CREATE_GAME_FAILURE:
			alert(action.payload)
			return { ...state, loading: false, error: action.payload }

		case types.CREATE_GAME_SUCCESS:
			alert("game added")
			return { ...state, games: [...state.games, action.payload], loading: false };

		case types.GAME_DELETE_REQUEST:
			return { ...state, loading: true }

		case types.GAME_DELETE_FAILURE:
			alert(action.payload)
			return { ...state, loading: false, error: action.payload }

		case types.GAME_DELETE_SUCCESS:
			alert("game deleted")
			return { ...state, games: [...state.games.filter(game => game._id != action.payload)], loading: false }

		case types.ADD_PLAYER_FAILURE:
			alert(action.payload)
			return { ...state, loading: false, error: action.payload }

		case types.ADD_PLAYER_SUCCESS:
			console.log(action)
			const newPlayerId = action.payload[1]
			const gameId = action.payload[0]
			const updatedGame = state.games.find(g => g._id === gameId)
			updatedGame.players.push({ id: newPlayerId, points: 0, isReady: false })
			return { ...state, games: [...state.games.filter(g => g.id !== gameId), updatedGame], loading: false }

		default:
			return state
	}

}

