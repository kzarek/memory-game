import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
// const axios =require('axios')
import { connect } from "react-redux";
import { deleteUser, getUsersList } from '../../ducks/users/operations';

const UserPage = ({ user, getUsersList, deleteUser }) => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getUsersList()

    }, [])

    useEffect(() => {
        console.log("wchodzi do useEffect")
        if (user) {
            console.log(user)
            setCurrentUser(user)
            setLoading(false)
        }
    }, [user, currentUser]);



    return (
        <div className="UserPage">
            {console.log("osoba" + currentUser)}
            {currentUser ?
                (<div className="User">
                    <div>
                        <p> nazwa uzytkownika {currentUser[0].name}</p>
                        <div> email {currentUser[0].email}</div>
                        <button onClick={() => { deleteUser(currentUser[0].id); navigate("/") }}>Usuń konto</button>
                    </div>
                </div>) :
                <div>Ładowanie....</div>}



        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.users.currentlyLoged,
    };
}

const mapDispatchToProps = {
    getUsersList,
    deleteUser

};


export default connect(mapStateToProps, mapDispatchToProps)(UserPage)




