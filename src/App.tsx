import React from 'react';
import Landing from "./pages/landing/landing";
import {Switch, Route, useLocation, Redirect} from 'react-router-dom';
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Amplify from "aws-amplify";
import awsconfig from './aws-exports';
import {useAppSelector} from "./redux/hooks";
import {userReducer} from "./redux/user/userSlice";
import Home from "./pages/home/home";
import ModalManager from "./components/ModalManager";
import Profile from "./pages/profile/profile";
import Authnav from "./components/authnav";

Amplify.configure(awsconfig)

const App = () => {

    const userRedux = useAppSelector(userReducer)
    const {username} = userRedux.userInfo;
    const location = useLocation();

    const GlobalRoutes = [
        {path: '/', component: Landing},
        {path: '/login', component: Login},
        {path: '/register', component: Register}
    ]
    const AuthRoutes = [
        {path: '/', component: Landing},
        {path: '/home', component: Home},
        {path: '/profile/:username', component: Profile}
    ]
    const RouteHandler = userRedux.LoggedIn ? AuthRoutes : GlobalRoutes;

   const CheckRoute = RouteHandler.find((value) => {
       if (location.pathname.startsWith('/profile') && username.length > 0) {
           return location.pathname;
       } else {
           return value.path === location.pathname;
       }
   })
   if (CheckRoute === undefined) {
      return <Redirect to={'/'}/>
   }

    return (
        <>
          <ModalManager/>
            {location.pathname === '/' ? '' : RouteHandler === AuthRoutes && <Authnav/>}
          <Switch>
            {RouteHandler.map(({path, component}: any) => {
                return <Route key={path} exact path={path} component={component}/>;
            })}
          </Switch>
        </>
    );
};

export default App;