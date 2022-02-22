import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
// const axios =require('axios')
import { connect } from "react-redux";
import { deleteComment } from '../../ducks/comments/operations';
const Comments = ({ comments, deleteComment, users,user }) => {

    const [displayedComments, setDisplayedComments] = useState([])
    const [loading, setLoading] = useState(true)
    console.log(" użytkownik potrzebny do komentarzy")
    console.log(user)
    useEffect(() => {

        if (comments) {
            console.log(comments)
            setDisplayedComments(comments)
            setLoading(false)
        }
    }, [comments]);

    return (
        <div className="ActiveGames">
            {displayedComments ?
                displayedComments.map(comment => {
                    return (
                        <div key={comment._id} className="OneComment">
                            <div>
                                <div> {comment.text}</div>
                                <div> {users.find(user => user._id == comment.userId).name}</div>
                                <div>{comment.date}</div>
                                {user.isAdmin && (<div> <button onClick={()=>deleteComment(comment._id)}>usuń komentarz</button></div>)}
                            </div>




                        </div>)
                }) :

                <div>Ładowanie....</div>}



        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        comments: state.comments.comments,
        users: state.users.users,
        user: state.users.currentlyLoged[0]
    };
}


const mapDispatchToProps = {
    deleteComment

};


export default connect(mapStateToProps, mapDispatchToProps)(Comments)