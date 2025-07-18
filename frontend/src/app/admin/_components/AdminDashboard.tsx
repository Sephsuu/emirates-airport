import { AdminSidebar } from "@/components/custom/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function AdminDashboard() {
    return(
        <SidebarProvider>
            <AdminSidebar />
        </SidebarProvider>
    );
}