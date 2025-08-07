export class UserDTO {
    id: string;
    email: string;
    name?: string;
    password: string;
    created_at: string;
}

export class CreateUserDTO {
    email: string;
    password: string;
}

export class CreateUserWithGoogle {
    email: string;
    name: string;
    avatar: string;
    provider: string;
    provider_id: string;
}

export class GetUserDTO {
    id: string;
    email: string;
}

