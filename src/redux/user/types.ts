export interface User {
    id: string;
    username: string;
    website: string;
    userImage: string;
    profession: string;
    followers: string[],
    following: string[],
    notifications?: notificationItem[],
}


export interface userForm {
    confirmOldPassword: string;
    oldPassword: string;
    newPassword: string;
    username: string;
    globalMessage: string;
    code: string;
    password: string;
}

export interface notificationItem {
    id: string;
    message: string;
    user: string;
}
