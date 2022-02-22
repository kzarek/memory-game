export const getGames = (state) => state.games.games

export const getOneGameById = (state,id) => {
    console.log(state.games.games.find(game => game.id === parseInt(id)))

    return state.games.games.find(game => game.id === parseInt(id))
}