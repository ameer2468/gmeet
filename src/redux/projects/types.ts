export interface projectMember {
    image: string;
    name: string;
}

export interface project {
    id: string;
    name: string;
    description: string;
    owner: string;
}

export interface projectCreate {
    name: string;
    description: string;
}