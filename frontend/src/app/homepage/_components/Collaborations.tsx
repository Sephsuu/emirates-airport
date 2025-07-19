import { partnerAirlines } from "@/lib/data-array";

export function CollaborationsSection() {
    return(
        <section className="px-10 h-fit bg-dark py-24">
            <div className="grid grid-cols-7">
                <div className="col-span-3">
                    <div className="text-5xl text-light font-emirates-bold">Together, Connecting the World!</div>
                    <div className="text-md text-slate-300">Emirates is proud to collaborate with leading airports around the globe, forging partnerships that elevate travel for everyone. Through shared innovation, regular knowledge exchange, and joint commitment to operational excellence, we’re introducing advanced solutions that streamline airport processes, enhance safety, and provide passengers with seamless journeys.</div>
                </div>
                <div className="col-span-4 grid grid-cols-3 gap-2">
                    {partnerAirlines.map((item, index) => (
                        <div className="flex justify-center items-center m-4" key={ index }>
                            <img src={`/images/${item}`} alt="" className="drop-shadow-slate-500 drop-shadow-xs" key={ index } />
                        </div>
                        
                    ))}
                </div>
            </div>
        </section>
    );
}