import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { createUsers } from "../../ducks/users/operations";
import { connect } from "react-redux";
const axios = require('axios');
const Register=({createUsers})=>{
    const playerSchema=Yup.object().shape({
        login: Yup.string().required("Login jest wymagany"),
        name:Yup.string().required("Nazwa jest wymagana"),
        email:Yup.string().required("email jest wymagany"),
        password:Yup.string().required("Hasło jest wymagane"),
        password2:Yup.string().required("Potwierdzenie hasła jest wymagane"),

    })
    const [initialValues, setInitialValues] = useState({
		login:"",
        name:" ",
        email:" ",
        password:"",
        password2:"",
       
        
	});


    const handleSubmit=(values)=>{
        if(values.password===values.password2){
    //         axios.post("http://localhost:5000/players",{
    //         userName:values.userName,
    //         password:values.password,
    //         name:values.name
    //     }).then(function (response) {
    //      console.log(response);
    //    })
    //    .catch(function (error) {
    //      console.log(error);
    //    });
            createUsers({
                login:values.login,
                name:values.name,
                email:values.email,
                password:values.password
            })

        }
        else{
            alert("hasła nie są takie same")
        }
        
    }

    return(
        <div className="Registration Form" id="Form">
            <p>Register</p>
            <Formik initialValues={initialValues}
				validationSchema={playerSchema}
				onSubmit={(values) => handleSubmit(values)}
				enableReinitialize={true}>
				<Form>
					<label htmlFor="login">login</label>
					<br />
					<Field name="login" id="Field" />
					<ErrorMessage name="login" component="div" />
					<br />
                    <label htmlFor="name">nazwa użytkownika</label>
					<br />
					<Field name="name" id="Field" />
					<ErrorMessage name="name" component="div" />
					<br />
                    <label htmlFor="email">email</label>
					<br />
					<Field name="email" id="Field" />
					<ErrorMessage name="email" component="div" />
					<br />
					<label htmlFor="password">hasło</label>
					<br />
					<Field name="password" id="Field"  type="password" />
					<ErrorMessage name="password" component="div" />
					<br />
                    <label htmlFor="password2">potwierdz hasło</label>
					<br />
					<Field name="password2" id="Field" type="password" />
					<ErrorMessage name="password" component="div" />
					<br />
					<button type="submit" className="button">submit</button>
				</Form>
			</Formik>
   
            </div>
    )
}

const mapDispatchToProps = {
	createUsers

};
export default connect(null, mapDispatchToProps)(Register)