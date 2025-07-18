import { Navigation } from "@/components/custom/navigation";
import { Homepage } from "./homepage/page";

export default function Home() {
  return (
    <section className="max-w-[1440px] mx-auto">
        <div>
            <Navigation />
            <Homepage />
        </div>
    </section>
  );
}