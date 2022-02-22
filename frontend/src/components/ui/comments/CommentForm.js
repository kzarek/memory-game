import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useState } from 'react';
import { connect } from "react-redux";
import { createComment } from '../../ducks/comments/operations';
const axios = require('axios');

const CommentForm = ({ createComment, user }) => {

    const commentSchema = Yup.object().shape({
        text: Yup.string().required("To pole nie może pozostać puste"),
    })
    const [initialValues, setInitialValues] = useState({
        text: " ",
        userId:user[0]._id,
        date:""
    });
    const handleSubmit = (values) => {
        console.log(user[0]._id)
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        createComment({
            text: values.text,
            userId:user[0]._id,
            date:dateTime

        })

    }

    return (
        <div id="CommentForm">
            <h4>Dodaj komentarz</h4>
            <Formik initialValues={initialValues}
                validationSchema={commentSchema}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}>
                <Form>
                    <label htmlFor="text">twój komentarz</label>
                    <br />
                    <Field name="text" as="textarea"/>
                    <ErrorMessage name="text" component="div" />
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
    createComment
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)