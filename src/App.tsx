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
import { ToastContainer } from 'react-toastify';
import ProjectDetails from "./pages/projectdetails/projectDetails";
import Top from "./pages/topprojects/top";
import EditProfile from "./pages/editprofile/editprofile";
import Forgot from "./pages/forgotPassword/forgot";
import About from './pages/about/about';
import Navbar from "./components/navbar";

Amplify.configure(awsconfig)

const App = () => {

    const userRedux = useAppSelector(userReducer)
    const location = useLocation();

    const GlobalRoutes = [
        {path: '/', component: Landing},
        {path: '/login', component: Login},
        {path: '/forgot-password', component: Forgot},
        {path: '/register', component: Register},
        {path: '/about', component: About},
    ]
    const AuthRoutes = [
        {path: '/', component: Landing},
        {path: '/home', component: Home},
        {path: '/top', component: Top},
        {path: '/project/:name', component: ProjectDetails},
        {path: '/profile/:username', component: Profile},
        {path: '/editprofile', component: EditProfile}
    ]
    const RouteHandler = userRedux.LoggedIn ? AuthRoutes : GlobalRoutes;

   const CheckRoute = RouteHandler.find((value) => {
       if (location.pathname.startsWith('/profile') && Object.keys(userRedux.authUser).length > 0) {
           return location.pathname;
       } if (location.pathname.startsWith('/project') && Object.keys(userRedux.authUser).length > 0) {
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
            {/*{!authUser ? '' :*/}
            {/*    <>*/}
            {/*    <ChatToggle/>*/}
            {/*    <Chat/>*/}
            {/*   </>*/}
            {/*}*/}
            {location.pathname === '/' ? '' : RouteHandler === AuthRoutes
                ? <Authnav/>
                :
                location.pathname !== '/login' &&
                location.pathname !== '/register' &&
                location.pathname !== '/forgot-password'
                && <Navbar/>
            }
          <Switch>
            {RouteHandler.map(({path, component}: any) => {
                return <Route key={path} exact path={path} component={component}/>;
            })}
          </Switch>
        </>
    );
};

export default App;
