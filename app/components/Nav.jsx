"use client";

import Link from "next/link";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  Chip,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMosquito } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <Navbar
      className="backdrop-opacity-20 backdrop-blur-3xl mb-10"
      isBlurred={true}
    >
      <NavbarBrand>
        <div className="font-bold text-inherit">
          <Chip
            classNames={{
              base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 p-2 text-xs",
              content: "drop-shadow shadow-black text-white",
            }}
          >
            <FontAwesomeIcon icon={faMosquito} className="mr-2" size="xl" />
            Alpha version 1.0
          </Chip>
        </div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-[80px] ml-10 justify-evenly">
        <NavbarItem>
          <Link
            color="foreground"
            href="/"
            className="font-bold text-purple-500"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/dashboard"
            aria-current="page"
            className="text-purple-500 font-bold"
          >
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/admit"
            className="text-purple-500 font-bold"
          >
            Admit
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
