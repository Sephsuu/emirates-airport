import { BASE_URL } from "@/lib/utils";
import { LoginForm } from "@/types/user";

const URL = `${BASE_URL}/auth`;

export class AuthService {
    static async signInWithGoogle(provider: string) {
        console.log(provider);
        
        const res = await fetch(`${URL}/oauth/${provider}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log(res);
        

        if (!res.ok) throw new Error("Invalid Credentials!");

        // return res.json();
    } 

    static async login(user: LoginForm) {
        console.log("User", user);
        console.log(URL);
        
        const res = await fetch(`${URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        if (!res.ok) throw new Error("Invalid Credentials!");

        return res.json();
    } 
}