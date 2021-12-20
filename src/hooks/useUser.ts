import {useAppSelector} from "../redux/hooks";
import {userReducer} from "../redux/user/userSlice";
import {useState} from "react";
import AWS from 'aws-sdk';
import axios from "axios";


export function useUser() {
    const user = useAppSelector(userReducer)
    const {userInfo, authUser} = user;
    const [userImage, setUserImage] = useState('');



    /*User Profile pictures*/

    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY_ID,
    })
    const s3 = new AWS.S3({
        params: {Bucket: 'gmeet-images'},
        region: 'us-east-1',
        signatureVersion: 'v4'
    });

    const uploadFile = async (file: any) => {
        const putParams = {
            Bucket: 'gmeet-images',
            Key: file.name,
            ContentType: 'image/*'
        };
        const getParams = {
            Bucket: 'gmeet-images',
            Key: file.name,
        };
        await s3.getSignedUrlPromise('putObject', putParams).then(async (res) => {
            await axios.put(res, file)
            s3.getSignedUrlPromise('getObject', getParams
            ).then((url) => {
                setUserImage(url)
            })
        })
    }


    return {
        user,
        userInfo,
        userImage,
        uploadFile,
        authUser,
    }
}