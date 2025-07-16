import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { heroContinents } from "@/lib/data-array";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
    return(
        <section 
            className="h-screen"
            style={{ 
                backgroundImage: 'url("/images/dubai.png")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="flex flex-col gap-2 h-full justify-center items-center my-auto">

                <div className="z-20 flex flex-col items-center">
                    <div className="text-6xl font-emirates-bold text-light">Don't Just Fly,</div>
                    <div className="text-light font-emirates-bold text-8xl italic">FLY BETTER</div>
                </div>

                <div className="relative flex flex-col justify-center rounded-full p-[2px] bg-[linear-gradient(90deg,_hsla(312,93%,84%,1)_0%,_hsla(220,61%,79%,1)_100%)] w-120 z-20">
                    <Input
                        className="rounded-full bg-light placeholder:text-gray-400 pl-4" 
                        placeholder="Search for flights"
                    />

                    <div className="absolute right-2 flex justify-center items-center">
                        <Select>
                            <SelectTrigger className="!border-0 !bg-transparent text-sm !gap-1 font-semibold px-1">
                                <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="USA">USA</SelectItem>
                            </SelectContent>
                        </Select>

                        <button><Search className="text-light rounded-full w-6 h-6 bg-darkred p-1.5 hover:bg-light hover:text-darkred hover:border-1 hover:border-darkred" /></button>
                    </div>
                </div>

                <div className="flex z-30 gap-6">
                    {
                        heroContinents.map((continent, index) => (
                            <Link 
                                href={ continent.link } 
                                key={ index }
                                className="text-sm text-light font-emirates-bold underline hover:text-darkred"
                            >
                                { continent.continent }
                            </Link>
                        ))
                    }
                </div>

                <Image
                    src={"/images/hero.png"}
                    alt=""
                    width={500}
                    height={500}
                    className="hero w-200 mt-[-100px] z-10 bottom-0"
                />

            </div>
        </section>
    );
}