import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useState } from 'react';
import { connect } from "react-redux";
import { createGames } from '../../ducks/games/operations';
import {  useNavigate } from 'react-router-dom'
const axios = require('axios');

const GameForm = ({ createGames, user }) => {
    const navigate= useNavigate()
    const gameSchema = Yup.object().shape({
        name: Yup.string().required("Gameroom name is required"),


    })
    const [initialValues, setInitialValues] = useState({
        name: " "
    });
    const handleSubmit = (values) => {
        console.log(user[0]._id)
        createGames({
            name: values.name,
            currentPlayerId: user[0]._id,
            players: [{ id: user[0]._id, points: 0 }]
        })
        navigate("/activeGames")
    }

    return (
        <div id="Form">
            <h4>Stwórz nowy pokój</h4>
            <Formik initialValues={initialValues}
                validationSchema={gameSchema}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}>
                <Form>
                    <label htmlFor="name">room name</label>
                    <br />
                    <Field name="name" />
                    <ErrorMessage name="name" component="div" />
                    <br />

                    <button type="submit" className="button">submit</button>
                </Form>
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.users.currentlyLoged,
    };
}

const mapDispatchToProps = {
    createGames
};
export default connect(mapStateToProps, mapDispatchToProps)(GameForm)
