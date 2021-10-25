import {useAppSelector} from "../redux/hooks";
import {userReducer} from "../redux/user/userSlice";


export function useUser() {
    const user = useAppSelector(userReducer)
    const {userInfo} = user;


    return {
        user,
        userInfo
    }
}