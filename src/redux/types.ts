export interface acceptRequest {
    id: string;
    project_id: string;
    role: string;
    user_id: string;
}


export interface post {
    post_id: string;
    post: string;
    date: string;
    user: string;
    comments: comment[]
}

export interface followers {
    id: string;
    user_id: string;
}

export interface following {
    follower_id: string;
    id: string;
}


export interface comment {
    post_id: string;
    id: string;
    comment: string;
    date: string;
    posted_by: string;
}

export interface requests {
    project_id: string;
    user: string;
    why: string;
    speciality: string;
    id: string;
}

export interface IcreateProject {
        project_id: string;
        name: string;
        description: string;
        owner: string;
        user_id: string;
        role: string;
        members: string[]
        requests: requests[]
}
