export class UserDTO {
    id: string;
    email: string;
    password: string;
    created_at: string;
}

export class CreateUserDTO {
    email: string;
    password: string;
}