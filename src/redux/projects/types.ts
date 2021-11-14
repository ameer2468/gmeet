export interface projectMember {
    image: string;
    name: string;
}

export interface project {
    project_id: string;
    name: string;
    description: string;
    owner: string;
}

export interface selectedProject {
    project_id: string;
    name: string;
    description: string;
    owner: string;
}

export interface projectRequest {
    project_id: string;
    user: string;
    why: string;
    speciality: string;
    id: string;
}

export interface projectCreate {
    name: string;
    description: string;
}