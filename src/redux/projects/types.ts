export interface projectMember {
    image: string;
    name: string;
}

export interface acceptRequest {
    project_id: string;
    members: string;
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

export interface editProject {
    project_id: string;
    name: string;
    description: string;
}

export interface project {
    project_id: string;
    name: string;
    image: string;
    description: string;
    owner: string;
    role: string;
    user_id?: string;
    requests?: projectRequest[]
}

export interface projectDetails extends project {
    userImage: string;
}

export interface selectedProject {
    project_id: string;
    name: string;
    image: string;
    description: string;
    owner: string;
    role: string;
    user_id?: string;
    requests?: projectRequest[]
}

export interface projectRequest {
    project_id: string;
    user_id: string;
    user: string;
    why: string;
    role: string;
    id: string;
}

export interface topProjects {
    project_id: string;
    owner: string;
    name: string;
    count: string;
}

export interface projectCreate {
    name: string;
    description: string;
}
