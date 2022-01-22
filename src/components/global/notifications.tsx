import React from 'react';
import {useAppSelector} from "../../redux/hooks";
import {userReducer} from "../../redux/user/userSlice";
import NotificationLoader from "./placeholders/notification";

const Notifications = () => {

    const userStore = useAppSelector(userReducer);
    const {authUser} = userStore;
    const {notificationLoading} = userStore;

    return (
        <div className="notifications">
            {notificationLoading ? <NotificationLoader/> : authUser.notifications.length === 0 ? 'No Notifications' :
                notificationLoading ? <NotificationLoader/> :
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
        </div>
    );
};

export default Notifications;
