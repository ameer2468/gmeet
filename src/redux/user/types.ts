


export interface User {
    id: string;
    username: string;
    website: string;
    profession: string;
    followers: string[],
    following: string[],
    notifications: notificationItem[],
}

export interface notificationItem {
    id: string;
    message: string;
    user: string;
}