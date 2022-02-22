import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Chat from './components/ui/Chat';
import Game from "./components/ui/games/Game";
import Navbar from "./components/ui/Navbar";
import LogIn from "./components/ui/users/LogIn";
import Register from "./components/ui/users/Register";
import GameForm from "./components/ui/games/GameForm";
import ActiveGames from "./components/ui/games/ActiveGames";
import { getGamesList } from "./components/ducks/games/operations";
import { connect } from "react-redux"
import FrontPage from "./components/ui/Frontpage";
import { useEffect } from 'react'
import { getUsersList, loginUser } from "./components/ducks/users/operations";
import UserPage from "./components/ui/users/UserPage";
import { useCookies } from 'react-cookie';
import { getComments } from "./components/ducks/comments/operations";
import CookieConsent, {getCookieConsentValue} from "react-cookie-consent"
import UserList from "./components/ui/users/UserList";
function App({ getGamesList, getUsersList, loginUser, getComments }) {
  const [cookies] = useCookies(['userCookie']);
  const [agreeCookie, setAgreeCookie] = useCookies(['agree']);
  // setCookie('agreeCokie', user, { path: '/' })
  useEffect(() => {
    getGamesList();
    getUsersList();
    loginUser(cookies.userCookie);
    getComments()
    setAgreeCookie(getCookieConsentValue())
  }, [getGamesList, getUsersList,CookieConsent,getComments]);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<FrontPage />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/game/:id" element={<Game />}></Route>
            <Route path="/gameForm" element={<GameForm />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/activeGames" element={<ActiveGames />}></Route>
            <Route path="/userPage" element={<UserPage />}></Route>
            <Route path="/userList" element={<UserList />}></Route>
          </Routes>
          <CookieConsent debug={true}
           buttonText="Właśnie tak powinno być" 
           cookieName="ciasteczko"
           style={{ background: "#2B373B" }}
           buttonStyle={{background: "#C3073F", color:"white", fontSize: "13px" }}
           >Ta strona używa ciasteczek</CookieConsent>
        </div>
      </BrowserRouter>
    </div>
  );
}

const mapDispatchToProps = {
  getGamesList,
  getUsersList,
  loginUser,
  getComments
};

export default connect(null, mapDispatchToProps)(App)