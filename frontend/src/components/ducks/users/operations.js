import { createAction } from "redux-api-middleware"
import types from "./types";


export const getUsersList = () => {
	return createAction({
		endpoint: 'http://localhost:5000/users',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		types: [
			types.USER_LIST_REQUEST,
			types.USER_LIST_SUCCESS,
			types.USER_LIST_FAILURE
		]
	})
}

export const deleteUser = (userId) => {
	return createAction({
		endpoint: 'http://localhost:5000/users/' + userId,
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		types: [
			types.USER_DELETE_REQUEST,
			{
				type: types.USER_DELETE_SUCCESS,
				payload: userId
			},
			types.USER_DELETE_FAILURE
		]
	})
}

export const createUsers = (newUser) => {
	return createAction({
		endpoint: 'http://localhost:5000/users',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newUser),
		types: [
			types.CREATE_USER_REQUEST,
			types.CREATE_USER_SUCCESS,
			types.CREATE_USER_FAILURE
		]
	})
}

export const loginUser = (newUser) => {
	return createAction({
		endpoint: 'http://localhost:5000/users/login',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newUser),
		types: [
			types.LOGIN_USER_REQUEST,
			types.LOGIN_USER_SUCCESS,
			types.LOGIN_USER_FAILURE
		]
	})
}
