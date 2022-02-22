import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../ducks/users/operations";
import {  useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';


const LogIn = ({ loginUser,user }) => {
	const navigate = useNavigate();
	
	const userSchema = Yup.object().shape({
		login: Yup.string().required("Login is required"),
		password: Yup.string().required("Password is required"),

	})

	const [initialValues, setInitialValues] = useState({
		login: "",
		password: ""
	});

	const [cookies, setCookie] = useCookies(['name']);

	const handleSubmit = (values) => {
		var user = {
			login: values.login,
			password: values.password
		}
		loginUser(user)

		setCookie('userCookie', user, { path: '/' })
		navigate("/")
	}

	return (
		<div className="LogIn" id="Form">
			<p>LogIn</p>

			<Formik initialValues={initialValues}
				validationSchema={userSchema}
				onSubmit={(values) => handleSubmit(values)}
				enableReinitialize={true}>
				<Form>
					<label htmlFor="login">login</label>
					<br />
					<Field name="login" id="Field" />
					<ErrorMessage name="login" component="div" />
					<br />
					<label htmlFor="password">hasło</label>
					<br />
					<Field name="password" id="Field" type="password" />
					<ErrorMessage name="password" component="div" />
					<br />
					<button type="submit" className="button">zatwierdź</button>
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
	loginUser

};
export default connect(null, mapDispatchToProps)(LogIn)