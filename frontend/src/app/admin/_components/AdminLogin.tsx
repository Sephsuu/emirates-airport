"use client"

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { handleChange } from "@/lib/form-handler";
import { AuthService } from "@/service/authService";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export function AdminLogin() {
    const router = useRouter();

    const [user, setUser] = useState();
    const [onProcess, setProcess] = useState<boolean>(false);

    async function handleSubmit() {
        try {
            setProcess(true);
            if (user) {
                const data =  await AuthService.login(user);
                if (data) {
                    toast.success("You have logged in successfully! Please wait patienty.");
                    return router.push("admin/dashboard")
                }
                return toast.info("You have entered an invalid credential. Please try again!")
            }
            return toast.info("Please fill up the login form.")
        } catch (error) {
            toast.error(`${error}`)
        } finally {
            setProcess(false);
        }
    }

    return(
        <section 
            className="h-screen flex justify-center items-center bg-light bg-cover"
            style={{ backgroundImage: "url(/images/ffflurry.svg)" }}
        >
            <Toaster closeButton position="top-center" />
            <div className="flex flex-col gap-4 p-8 bg-white shadow-md w-100 pb-12 border-1 border-slate-300">
                <div className="w-full flex justify-center items-center gap-2 my-1">
                    <Image
                        src={ "/images/emirates_logo.png" }
                        alt=""
                        className="w-20"
                        width={ 90 }
                        height={ 90 }
                    />
                    <Image
                        src={ "/images/uae_logo.png" }
                        alt=""
                        className="w-7"
                        width={ 30 }
                        height={ 30 }
                    />
                </div>
                <div className="text-2xl font-emirates-bold text-center">Log In as Administrator</div>

                <div>
                    <div className="text-md text-gray">Your Credentials</div>
                    <input
                        type="text"
                        className="w-full px-3 rounded-md py-1.5 text-md border-slate-400 border-1"
                        name="email"
                        onChange={ e => handleChange(e, setUser) }
                    />
                </div>

                <div>
                    <div className="text-md text-gray">Password</div>
                    <input
                        type="password"
                        className="w-full px-3 rounded-md py-1.5 text-md border-slate-400 border-1"
                        name="password"
                        onChange={ e => handleChange(e, setUser) }
                    />
                </div>

                <Button
                    className="!bg-darkred text-light text-md hover:opacity-90 w-full mt-2"
                    onClick={ handleSubmit }
                    disabled={ onProcess }
                >
                    {onProcess ? (<><LoaderCircle className="w-4 h-4 animate-spin text-light" />Logging In</>) : "Log In"}
                </Button>
            </div>
        </section>
    );
}