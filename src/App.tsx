import React, {useEffect} from 'react';
import Landing from "./pages/landing/landing";
import {Switch, Route, useLocation, Redirect} from 'react-router-dom';
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Amplify, {Auth} from "aws-amplify";
import awsconfig from './aws-exports';
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {authedUser, userReducer} from "./redux/user/userSlice";
import Home from "./pages/home/home";
import ModalManager from "./components/ModalManager";
import Profile from "./pages/profile/profile";
import Authnav from "./components/authnav";
import { ToastContainer } from 'react-toastify';
import {useProject} from "./hooks/useProject";
import {projectValues} from "./redux/projects/projectSlice";
import ProjectDetails from "./pages/projectdetails/projectDetails";

Amplify.configure(awsconfig)

const App = () => {


    const userRedux = useAppSelector(userReducer)
    const {username} = userRedux.authUser;
    const location = useLocation();
    const dispatch = useAppDispatch();
    const projectHook = useProject();
    const {projectForm} = projectHook.projects;
    const {searchterm} = projectForm;


    /*Reset search */

    useEffect(() => {
        if (username) {
            Auth.currentUserInfo().then((data) => {
                return dispatch(authedUser(data))
            });
        }
        if (!location.pathname.startsWith('/home')) {
            if (searchterm.length > 0) {
                dispatch(projectValues({description: '', name: '', searchterm: ''}))
            }
        }
    }, [dispatch, searchterm, location.pathname, username])

    const GlobalRoutes = [
        {path: '/', component: Landing},
        {path: '/login', component: Login},
        {path: '/register', component: Register}
    ]
    const AuthRoutes = [
        {path: '/', component: Landing},
        {path: '/home', component: Home},
        {path: '/project/:id', component: ProjectDetails},
        {path: '/profile/:username', component: Profile}
    ]
    const RouteHandler = userRedux.LoggedIn ? AuthRoutes : GlobalRoutes;

   const CheckRoute = RouteHandler.find((value) => {
       if (location.pathname.startsWith('/profile') && username.length > 0) {
           return location.pathname;
       } if (location.pathname.startsWith('/project') && username.length > 0) {
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