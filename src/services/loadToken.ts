import {Auth} from "aws-amplify";

export const loadToken = async () => {
    const user = await Auth.currentAuthenticatedUser();
    return user.signInUserSession.idToken.jwtToken;
};