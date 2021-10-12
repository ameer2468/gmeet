import React from 'react';
import Landing from "./pages/landing/landing";
import {Switch, Route, useLocation, Redirect} from 'react-router-dom';
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Amplify from "aws-amplify";
import awsconfig from './aws-exports';
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {userReducer} from "./redux/user/userSlice";
import Home from "./pages/home/home";
import {modalReducer} from "./redux/modals/modalSlice";
import ModalManager from "./components/ModalManager";

Amplify.configure(awsconfig)

const App = () => {

    const userRedux = useAppSelector(userReducer)
    const location = useLocation();
    const modals = useAppSelector(modalReducer)
    const dispatch = useAppDispatch();

    const GlobalRoutes = [
        {path: '/', component: Landing},
        {path: '/login', component: Login},
        {path: '/register', component: Register}
    ]
    const AuthRoutes = [
        {path: '/', component: Landing},
        {path: '/home', component: Home}
    ]
    const RouteHandler = userRedux.LoggedIn ? AuthRoutes : GlobalRoutes;

   const CheckRoute = RouteHandler.find((value) => {
       return value.path === location.pathname;
   })
   if (CheckRoute === undefined) {
      return <Redirect to={'/'}/>
   }

    return (
        <>
            <ModalManager/>
          <Switch>
            {RouteHandler.map(({path, component}: any) => {
                return <Route key={path} exact path={path} component={component}/>;
            })}
          </Switch>
        </>
    );
};

export default App;