export interface acceptRequest {
    id: string;
    project_id: string;
    members: string;
}

export interface post extends posts {}

export interface posts {
    post_id: string;
    post: string;
    user: string;
}

export interface requests {
    project_id: string;
    user: string;
    why: string;
    speciality: string;
    id: string;
}

export interface IcreateProject {
    data: {
        project_id: string;
        name: string;
        description: string;
        owner: string;
        members: string[]
        requests: requests[]
    }
}