import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {authedUser, userDetails, userImageHandler, userImageUpload, userReducer} from "../redux/user/userSlice";
import axios from "axios";
import {s3} from '../services/s3';


export function useUser() {
    const user = useAppSelector(userReducer)
    const {userInfo, authUser} = user;
    const dispatch = useAppDispatch();

    /*User Profile pictures*/

    const uploadFile = async () => {
        dispatch(userImageHandler(true))
        const file = user.imageUpload;
        const putParams = {
            Bucket: 'gmeet-images',
            Key: `${userInfo.username}/profile.png`,
            ContentType: 'image/*'
        };
        const getParams = {
            Bucket: 'gmeet-images',
            Key: `${userInfo.username}/profile.png`,
        };
        await s3.getSignedUrlPromise('putObject', putParams).then(async (res) => {
            await axios.put(res, file)
        })
        s3.getSignedUrlPromise('getObject', getParams
        ).then((url) => {
            const updatedObject = {...userInfo, userImage: url}
            const authObjectUpdate = {...authUser, userImage: url}
            dispatch(userDetails(updatedObject))
            dispatch(authedUser(authObjectUpdate))
            dispatch(userImageHandler(false))
            dispatch(userImageUpload(''));
        })
    }


    return {
        user,
        userInfo,
        uploadFile,
        authUser,
    }
}