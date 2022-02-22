import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getGamesList, deleteGame, addPlayer } from '../../ducks/games/operations'

const ActiveGames = ({ games, deleteGame, user, addPlayer }) => {

    const [activeGames, setActiveGames] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if (games) {
            setActiveGames(games)
            setLoading(false)
        }
    }, [games]);

    function joinToGame(gameId, playerId) {
        addPlayer(gameId, playerId, games.find(g => g._id === gameId).players)
        navigate(`/game/${gameId}`)
    }

    return (
        <div className="ActiveGames">
            <div><Link to="/gameForm"><button>Stwórz nową gre</button></Link></div>
            {/* {activeGames.lenght == 0 ? <div>Brak aktywnych gier</div> : <div>Aktywne Gry</div>} */}
            {activeGames ?
                activeGames.map(game => {
                    return (
                        <div key={game.id} className="Game">
                            <div>
                                <p> nazwa pokoju {game.name}</p>
                                <div> liczba graczy /2</div>
                            </div>
                            <button onClick={() => joinToGame(game._id, user._id)}> Dołącz do gry!</button>
                            <button onClick={() => deleteGame(game._id)}> Usuń grę</button>
                        </div>)
                }) :
                <div>Ładowanie....</div>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        games: state.games.games,
        user: state.users.currentlyLoged[0]
    };
}

const mapDispatchToProps = {
    getGamesList,
    deleteGame,
    addPlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveGames)