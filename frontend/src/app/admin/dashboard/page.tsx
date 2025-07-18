import { AdminSidebar } from "@/components/custom/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminDashboard() {
    return(
        <SidebarProvider>
            <AdminSidebar />
        </SidebarProvider>
    );
}