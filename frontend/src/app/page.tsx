import { Navigation } from "@/components/custom/navigation";
import Image from "next/image";
import { Homepage } from "./homepage/page";

export default function Home() {
  return (
    <section className="w-full">
      <div>
        <Navigation />
        <Homepage />
      </div>
    </section>
  );
}
