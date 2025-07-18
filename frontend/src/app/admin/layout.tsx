"use client"

import { AdminSidebar } from "@/components/custom/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from 'next/navigation';

export default function CountriesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sidebarExempt = [
    '/admin', 
  ];

  const hideSidebar = sidebarExempt.some(path => pathname === path);

  return (
    <SidebarProvider>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {!hideSidebar && <AdminSidebar />}
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
