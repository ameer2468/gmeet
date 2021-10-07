export interface Register {
    username: string,
    password: string,
    confirmpass: string;
    email: string
    code: string;
}

export interface Login {
    username: string;
    password: string;
}