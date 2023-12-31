"use client";
import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import { usePathname } from "next/navigation";

export function Nav() {
  const path = usePathname().split("/").slice(1);

  return (
    <>
      <Navbar
        isBordered
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
        className="flex flex-wrap nd:flex-nowrap"
      >
        <NavbarContent justify="start">
          <NavbarItem className="hidden lg:flex">
            <Link color="foreground" href="/">
              <Button
                isIconOnly
                color="default"
                variant={
                  (
                    !(path.includes("create-deck")) &&
                    !(path.includes("view") || path.includes("deck"))
                  )
                    ? "solid"
                    : "ghost"
                }
                aria-label="home"
              >
                <FaHome />
              </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={path.includes("create-deck")}>
            <Link aria-current="page" color="foreground" href="/create-deck">
              Create
            </Link>
          </NavbarItem>

          <NavbarItem isActive={path.includes("view") || path.includes("deck")}>
            <Link href="/view" color="foreground" aria-current="page">
              Study
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            {/* TODO: eventually need to check if user is logged in or not and change classname based on that fact */}
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
