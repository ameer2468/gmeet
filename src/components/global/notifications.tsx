import React from 'react';
import {useAppSelector} from "../../redux/hooks";
import {userReducer} from "../../redux/user/userSlice";

const Notifications = () => {

    const userStore = useAppSelector(userReducer);
    const {authUser} = userStore;

    return (
        <div className="notifications">
            {authUser.notifications.length === 0 ? 'No Notifications' :
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
