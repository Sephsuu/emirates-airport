import Image from "next/image";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSubItem } from "../ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { adminRoutes } from "./routes";

export function AdminSidebar() {
    return(
        <Sidebar className="bg-slate-800">
            <SidebarContent className="bg-[#faf0be]">
                <div className="flex justify-center items-center mt-4 gap-2">
                    <Image src={ "/images/emirates_logo.png" } alt="" className="w-20" width={ 90 } height={ 90 } />
                    <Image src={ "/images/uae_logo.png" } alt="" className="w-7" width={ 30 } height={ 30 } />
                </div>
                
                <SidebarMenu className="p-2">
                    
                    <SidebarGroupLabel className="-mb-2">Entities</SidebarGroupLabel>
                    {adminRoutes.entityRoutes.map((item, index) => (
                        <Collapsible key={ index } className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton asChild>
                                        <Link href="#" className="-mb-1">
                                            <item.icon />
                                            <span className="text-darkred">{ item.title }</span>
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </Link>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="flex flex-col">
                                    {item.children.map((sub, index) => (
                                        <Link 
                                            className="ml-8 py-1 pl-2 w-full text-sm rounded-sm hover:text-yellow-600 hover:bg-light" 
                                            href={`/admin/${sub.href}`} 
                                            key={ index }
                                        >
                                            { sub.title }
                                        </Link>
                                    ))}
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}

                    <SidebarGroupLabel className="-mb-2">Contents</SidebarGroupLabel>
                    {adminRoutes.contentRoutes.map((item, index) => (
                        <Collapsible key={ index } className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton asChild>
                                        <Link href="#" className="-mb-1">
                                            <item.icon />
                                            <span className="text-darkred">{ item.title }</span>
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </Link>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="flex flex-col">
                                    {item.children.map((sub, index) => (
                                        <Link className="ml-8 py-1 pl-2 w-full text-sm rounded-sm hover:text-yellow-600 hover:bg-light" href={ sub.href } key={ index }>{ sub.title }</Link>
                                    ))}
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}

                    <SidebarGroupLabel className="-mb-2">Analytics</SidebarGroupLabel>
                    {adminRoutes.analyticsRoutes.map((item, index) => (
                        <Collapsible key={ index } className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton asChild>
                                        <Link href="#" className="-mb-1">
                                            <item.icon />
                                            <span className="text-darkred">{ item.title }</span>
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </Link>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="flex flex-col">
                                    {item.children.map((sub, index) => (
                                        <Link className="ml-8 py-1 pl-2 w-full text-sm rounded-sm hover:text-yellow-600 hover:bg-light" href={ sub.href } key={ index }>{ sub.title }</Link>
                                    ))}
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}

                    <SidebarGroupLabel className="-mb-2">Notifications</SidebarGroupLabel>
                    {adminRoutes.notificationRoutes.map((item, index) => (
                        <Collapsible key={ index } className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton asChild>
                                        <Link href="#" className="-mb-1">
                                            <item.icon />
                                            <span className="text-darkred">{ item.title }</span>
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </Link>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="flex flex-col">
                                    {item.children.map((sub, index) => (
                                        <Link className="ml-8 py-1 pl-2 w-full text-sm rounded-sm hover:text-yellow-600 hover:bg-light" href={ sub.href } key={ index }>{ sub.title }</Link>
                                    ))}
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}

                    <SidebarGroupLabel className="-mb-2">Media and Files</SidebarGroupLabel>
                    {adminRoutes.filesRoutes.map((item, index) => (
                        <Collapsible key={ index } className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton asChild>
                                        <Link href="#" className="-mb-1">
                                            <item.icon />
                                            <span className="text-darkred">{ item.title }</span>
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </Link>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="flex flex-col">
                                    {item.children.map((sub, index) => (
                                        <Link className="ml-8 py-1 pl-2 w-full text-sm rounded-sm hover:text-yellow-600 hover:bg-light" href={ sub.href } key={ index }>{ sub.title }</Link>
                                    ))}
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}

                    <SidebarGroupLabel className="-mb-2">Support</SidebarGroupLabel>
                    {adminRoutes.supportRoutes.map((item, index) => (
                        <Collapsible key={ index } className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton asChild>
                                        <Link href="#" className="-mb-1">
                                            <item.icon />
                                            <span className="text-darkred">{ item.title }</span>
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </Link>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="flex flex-col">
                                    {item.children.map((sub, index) => (
                                        <Link className="ml-8 py-1 pl-2 w-full text-sm rounded-sm hover:text-yellow-600 hover:bg-light" href={ sub.href } key={ index }>{ sub.title }</Link>
                                    ))}
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}

                    <SidebarGroupLabel className="-mb-2">Settings</SidebarGroupLabel>
                    {adminRoutes.settingsRoutes.map((item, index) => (
                        <Collapsible key={ index } className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton asChild>
                                        <Link href="#" className="-mb-1">
                                            <item.icon />
                                            <span className="text-darkred">{ item.title }</span>
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </Link>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="flex flex-col">
                                    {item.children.map((sub, index) => (
                                        <Link className="ml-8 py-1 pl-2 w-full text-sm rounded-sm hover:text-yellow-600 hover:bg-light" href={ sub.href } key={ index }>{ sub.title }</Link>
                                    ))}
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}

                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}