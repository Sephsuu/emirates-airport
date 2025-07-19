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
      <div style={{  minHeight: '100vh' }} className="max-w-[1440px] flex px-2 py-4 bg-slate-100 w-full">
        {!hideSidebar && <AdminSidebar />}
          {children}
      </div>
    </SidebarProvider>
  );
}
