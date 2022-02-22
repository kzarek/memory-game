import types from "./types";

const initState = {
	comments: [],
	loading: false,
	error: ''
}

export const commentsReducer = (state = initState, action) => {
	switch (action.type) {
		case types.COMMENTS_LIST_REQUEST:
			return { ...state, loading: true }

		case types.COMMENTS_LIST_SUCCESS:
			console.log(action.payload)
			return { ...state, comments: [...action.payload], loading: false }

		case types.COMMENTS_LIST_FAILURE:
			alert(action.payload)
			return { ...state, loading: false, error: action.payload }

		case types.CREATE_COMMENT_REQUEST:
			return { ...state, loading: true }

		case types.CREATE_COMMENT_FAILURE:
			alert(action.payload)
			return { ...state, loading: false, error: action.payload }

		case types.CREATE_COMMENT_SUCCESS:
			alert("comment added")
			return { ...state, comments: [...state.comments, action.payload], loading: false };

		case types.COMMENT_DELETE_REQUEST:
			return { ...state, loading: true }

		case types.COMMENT_DELETE_FAILURE:
			alert(action.payload)
			return { ...state, loading: false, error: action.payload }

		case types.COMMENT_DELETE_SUCCESS:
			alert("comment deleted")
			console.log(action.payload + " action payload")
			
			return { ...state, games: [...state.comments.filter(comment => comment._id != action.payload)], loading: false }

		default:
			return state
	}

}