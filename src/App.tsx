import React, {useEffect} from 'react';
import Landing from "./pages/landing/landing";
import {Switch, Route, useLocation, Redirect} from 'react-router-dom';
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Amplify from "aws-amplify";
import awsconfig from './aws-exports';
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {userReducer} from "./redux/user/userSlice";
import Home from "./pages/home/home";
import ModalManager from "./components/ModalManager";
import Profile from "./pages/profile/profile";
import Authnav from "./components/authnav";
import { ToastContainer } from 'react-toastify';
import {useProject} from "./hooks/useProject";
import { useDebounce } from 'use-debounce';

Amplify.configure(awsconfig)

const App = () => {

    const projectHook = useProject();
    const {projectForm} = projectHook.projects;
    const [value] = useDebounce(projectForm.searchterm, 1000);


    /*Requests to Load App*/

    useEffect(() => {
       projectHook.getSearchProjects(value);
    }, [value])

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
            <ToastContainer/>
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