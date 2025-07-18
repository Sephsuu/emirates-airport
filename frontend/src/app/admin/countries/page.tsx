import { usePathname } from "next/navigation";

const baseUrl = '/admin/countries';
export default function CountriesPage() {
    const pathName = usePathname();
    return(
        pathName === `${baseUrl}/all` && return <Cont
    );
}