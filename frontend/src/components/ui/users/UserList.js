import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";


const UserList = ({ users, user}) => {

    const [shownUsers, setShownUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if (users) {
            setShownUsers(users)
            setLoading(false)
        }
    }, [users]);

    return (
        <div className="UserList">
            <div>Lista wszystkich zarejestrowanych użytkowników - TYLKO DLA ADMINISTRATORA</div>
            {shownUsers ?
                shownUsers.map(user => {
                    return (
                        <div key={user._id} className="Game">
                            <div>
                                <p> login {user.login}</p>
                                <div> nazwa {user.name}</div>
                                <div> email {user.email}</div>
                            </div>
                          
                        </div>)
                }) :
                <div>Ładowanie....</div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList)