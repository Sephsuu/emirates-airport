"use client";

import Image from "next/image";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from "../ui/navigation-menu";
import Link from "next/link";
import { navigationRoutes } from "@/lib/data-array";
import React, { useEffect, useState } from "react";
import { homeRoutes, subRoutes } from "./routes";
import { cn } from "@/lib/utils";

export function Navigation() {
     const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 10); // change 10 to any scroll threshold
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return(
        <section className={ `flex w-full justify-center sticky top-0 py-0.5 mt-[-55px] z-50 ${isScrolled ? 'bg-light shadow-md' : 'bg-transparent'}` }>

            <div className="w-full flex justify-center gap-2 my-1">
                <div className="flex items-center h-full">
                    <Image
                        src={ "/images/emirates_logo.png" }
                        alt=""
                        className="w-20"
                        width={ 90 }
                        height={ 90 }
                    />
                </div>
                <Image
                    src={ "/images/uae_logo.png" }
                    alt=""
                    className="w-7"
                    width={ 30 }
                    height={ 30 }
                />
            </div>

            <NavigationMenu className="w-full flex justify-center">
                <NavigationMenuList>
                    {
                        navigationRoutes.map((route, index) => (
                            <NavigationMenuItem key={ index }>
                                <NavigationMenuTrigger className={ `!bg-transparent font-emirates-bold hover:!text-gold ${isScrolled ? "text-dark" : "text-light"}` }>{ route.title }</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                    {subRoutes[index].map((components) => (
                                        <ListItem
                                            key={ components.title }
                                            title={ components.title }
                                            href={ components.title }
                                        >
                                            { components.description }
                                        </ListItem>
                                    ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))
                    }
                </NavigationMenuList>
            </NavigationMenu>

            <div className="w-full justify-center flex gap-2 items-center">
                <button className={ `rounded-full !bg-light text-sm py-1 w-25 ${isScrolled && "border-1 border-dark"}` }>Get Started</button>
                <button className="rounded-full !bg-darkred text-light text-sm py-1 w-25">Sign In</button>
            </div>

        </section>
    );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
