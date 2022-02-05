import React from 'react';
import {useAppSelector} from "../../redux/hooks";
import {userReducer} from "../../redux/user/userSlice";
import NotificationLoader from "./placeholders/notification";
import Scrollbars from "react-custom-scrollbars";

const Notifications = () => {

    const userStore = useAppSelector(userReducer);
    const {authUser} = userStore;
    const {notificationLoading} = userStore;

    return (
        <div className="notifications">
            <button className={'readButton'}>Mark all as read</button>
            <div className="container">
                <Scrollbars style={{height: '20rem'}}>
                    {notificationLoading ? <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                        <NotificationLoader/>
                    </div> : authUser.notifications.length === 0 ? 'No Notifications' :
                        notificationLoading ? <div style={{display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-evenly'}}>
                            <NotificationLoader/>
                            </div> :
                            authUser.notifications.map((value: any, index: number) => {
                                return (
                                    <div key={index.toString()} className="notification-item">
                                        <div className="wrap">
                                            <div className="circle"/>
                                            <p>{value.text}</p>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </Scrollbars>
            </div>
        </div>
    );
};

export default Notifications;
