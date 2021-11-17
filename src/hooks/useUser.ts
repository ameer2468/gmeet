import {useAppSelector} from "../redux/hooks";
import {userReducer} from "../redux/user/userSlice";


export function useUser() {

    const user = useAppSelector(userReducer)
    const {userInfo, authUser} = user;

    return {
        user,
        userInfo,
        authUser
    }
}