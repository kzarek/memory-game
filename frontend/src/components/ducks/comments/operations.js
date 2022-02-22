import { createAction } from "redux-api-middleware"
import types from "./types";

export const getComments = () => {
	return createAction({
		endpoint: 'http://localhost:5000/comments',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		types: [
			types.COMMENTS_LIST_REQUEST,
			types.COMMENTS_LIST_SUCCESS,
			types.COMMENTS_LIST_FAILURE
		]
	})
}

export const deleteComment = (commentId) => {
	return createAction({
		endpoint: 'http://localhost:5000/comments/' + commentId,
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		types: [
			types.COMMENT_DELETE_REQUEST,
			{
				type: types.COMMENT_DELETE_SUCCESS,
				payload: commentId
			},
			types.COMMENT_DELETE_FAILURE
		]
	})
}

export const createComment = (newComment) => {
	return createAction({
		endpoint: 'http://localhost:5000/comments',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newComment),
		types: [
			types.CREATE_COMMENT_REQUEST,
			types.CREATE_COMMENT_SUCCESS,
			types.CREATE_COMMENT_FAILURE
		]
	})
}

