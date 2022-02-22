import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger'
import { createMiddleware } from 'redux-api-middleware';
import { gamesReducer } from './games/reducers';
import  {usersReducer} from './users/reducers';
import { commentsReducer } from './comments/reducers';
const store = createStore(
  combineReducers({
  games:gamesReducer,
  users:usersReducer,
  comments:commentsReducer
}),applyMiddleware(thunk,createMiddleware(),logger)
  
  );

export default store;

