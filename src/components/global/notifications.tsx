import React from 'react';
import {useAppSelector} from "../../redux/hooks";
import {userReducer} from "../../redux/user/userSlice";
import NotificationLoader from "./placeholders/notification";
import Scrollbars from "react-custom-scrollbars";
import {useUser} from "../../hooks/useUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

const Notifications = () => {

    const userStore = useAppSelector(userReducer);
    const {authUser} = userStore;
    const {notificationLoading} = userStore;
    const {markAsRead} = useUser();
    const checkRead = !authUser.notifications ? '' : authUser.notifications.filter((value: any) => {
        return value.read_at === null;
    })

    console.log(authUser.notifications)

    return (
        <div className="notifications">
            <button disabled={checkRead.length === 0} onClick={() => markAsRead()} className={'readButton'}>{checkRead.length === 0 ?
                <p>All Notifications Read <FontAwesomeIcon style={{marginLeft: '1rem'}} icon={faCheckCircle}/></p>
                :
                'Mark all as read'
            }
            </button>
            <div className="container">
                <Scrollbars style={{height: '20rem'}}>
                    {notificationLoading ? <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                        <NotificationLoader/>
                    </div> : authUser.notifications.length === 0 ? <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>No Notifications</p> :
                        notificationLoading ? <div style={{display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-evenly'}}>
                            <NotificationLoader/>
                            </div> :
                            authUser.notifications.map((value: any, index: number) => {
                                return (
                                    <div key={index.toString()} className="notification-item">
                                        <div className="wrap">
                                            <div className={`circle ${value.read_at !== null && 'emptyCircle'}`}/>
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
