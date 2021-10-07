import React from 'react';
import Landing from "./pages/landing/landing";
import {Switch, Route, useLocation, Redirect} from 'react-router-dom';
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Amplify from "aws-amplify";
import awsconfig from './aws-exports';
import {useAppSelector} from "./redux/hooks";
import {userReducer} from "./redux/user/userSlice";

Amplify.configure(awsconfig)

const App = () => {

    const userRedux = useAppSelector(userReducer)
    const {LoggedIn} = userRedux.userStore;
    const location = useLocation();

    const GlobalRoutes = [
        {path: '/', component: Landing},
        {path: '/login', component: Login},
        {path: '/register', component: Register}
    ]
    const AuthRoutes = [
        {path: '/', component: Landing}
    ]
    const RouteHandler = LoggedIn ? AuthRoutes : GlobalRoutes;

   const CheckRoute = RouteHandler.find((value) => {
       return value.path === location.pathname;
   })
   if (CheckRoute === undefined) {
      return <Redirect to={'/'}/>
   }

    return (
            <Switch>
                {RouteHandler.map(({path, component}: any) => {
                    return <Route key={path} exact path={path} component={component}/>
                })}
            </Switch>
    );
};

export default App;