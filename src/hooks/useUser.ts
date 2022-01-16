import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {userReducer} from "../redux/user/userSlice";
import {followUserThunk, getNotifications, unFollowUserThunk} from "../redux/user/thunk";
import {v4 as uuidv4} from "uuid";


export function useUser() {
    const user = useAppSelector(userReducer)
    const {userInfo, authUser} = user;
    const dispatch = useAppDispatch();

    function getUserNotifications() {
        dispatch(getNotifications(authUser.id));
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
        } else {
           dispatch(unFollowUserThunk(userId));
        }
    }



    return {
        user,
        userInfo,
        followHandler,
        getUserNotifications,
        authUser,
    }
}
