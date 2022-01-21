import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {userReducer} from "../redux/user/userSlice";
import {followUserThunk, sendNotificationThunk, unFollowUserThunk} from "../redux/user/thunk";
import {v4 as uuidv4} from "uuid";


export function useUser() {
    const user = useAppSelector(userReducer)
    const {userInfo, authUser} = user;
    const dispatch = useAppDispatch();


    function sendNotification(users: [], text: string) {
        dispatch(sendNotificationThunk(users, text))
    }

    function followHandler(user: string, id: string) {
        const checkIfFollowing = authUser.following.map((item: any) => item.follower_id).includes(id);
        const filterFollowers = authUser.following.filter((value: any) => {
            return value.follower_id === id;
        })
        const userId = filterFollowers.length === 0 ? '' : filterFollowers[0].id;
        const data = {
            id: uuidv4(),
            user_id: authUser.attributes.sub,
            follower_id: userInfo.id,
        }
        if (!checkIfFollowing) {
            dispatch(followUserThunk(data));
            if (filterFollowers.length > 0) {
                sendNotification([id] as unknown as [], `${authUser.username} has followed you!`)
            }
        } else {
           dispatch(unFollowUserThunk(userId));
        }
    }



    return {
        user,
        userInfo,
        followHandler,
        authUser,
    }
}
