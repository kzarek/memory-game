import types from "./types";

const initState = {
    users: [],
	loading:false,
    error: '',
	currentlyLoged:' '
}

export const usersReducer=(state=initState,action)=>{
	switch(action.type){
		case types.USER_LIST_REQUEST:
			return{...state,loading:true}
			
		case types.USER_LIST_SUCCESS:
			return {...state,users:[...action.payload],loading: false}
			
		case types.USER_LIST_FAILURE:
			alert(action.payload)
			return {...state, loading:false, error: action.payload}

		case types.CREATE_USER_REQUEST:
			return{ ...state,loading:true}
		
		case types.CREATE_USER_FAILURE:
			alert(action.payload)
			return {...state, loading:false, error: action.payload}

		case types.CREATE_USER_SUCCESS:
			alert("user added")
			return {...state,users:[...state.users,action.payload],loading:false};

		case types.LOGIN_USER_REQUEST:
			return{ ...state,loading:true}
			
		case types.LOGIN_USER_FAILURE:
			
			return {...state, loading:false, error: action.payload}
	
		case types.LOGIN_USER_SUCCESS:
			return {...state,loading:false,currentlyLoged:action.payload};

		case types.USER_DELETE_REQUEST:
			return{...state,loading:true}

		case types.USER_DELETE_FAILURE:
			alert(action.payload)
			return{...state,loading:false,error:action.payload}

		case types.USER_DELETE_SUCCESS:
			alert("user deleted")
			return { ...state ,users:[...state.users.filter(user=>user._id!==parseInt(action.payload))],loading:false}

		default:
			 return state
	}

}
