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
import {
  faHospitalUser,
  faHouse,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { useSession, signIn, signOut } from "next-auth/react";

const Nav = (props) => {
  const { isVisible } = props.props;
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useReducer(
    (current) => !current,
    false
  );
  const menuItems = [
    { display: "Home", href: "/" },
    { display: "Dashboard", href: "/dashboard" },
    { display: "Admit", href: "/admit" },
  ];
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    //return navbar only if isVisible is true
    <>
      {isVisible && (
        <Navbar
          className="backdrop-opacity-20 backdrop-blur-3xl lg:mb-10"
          isBlurred={true}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          position="sticky"
        >
          <NavbarBrand className="hidden sm:flex">
            <div className="font-bold text-inherit">
              <Chip
                classNames={{
                  base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 p-2 text-xs ",
                  content: "drop-shadow shadow-black text-white",
                }}
              >
                Alpha version 1.0
              </Chip>
            </div>
          </NavbarBrand>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarContent className="hidden sm:flex gap-[80px] ml-10 justify-evenly">
            <NavbarItem>
              <Link
                color="foreground"
                href="/"
                className="font-bold text-purple-300"
              >
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="/dashboard"
                aria-current="page"
                className="text-purple-300 font-bold"
                prefetch={false}
              >
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                color="foreground"
                href="/admit"
                className="text-purple-300 font-bold"
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
                  name={session?.user?.name}
                  size="sm"
                  src={session?.user?.image}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{session?.user?.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={signOut}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
          <NavbarMenu className="flex flex-col pt-10 w-1/2 gap-8 h-[80px]">
            {menuItems.map((item, index) => (
              <NavbarMenuItem
                key={`${item}-${index}`}
                onClick={() => {
                  console.log("pressed");
                  setIsMenuOpen();
                }}
              >
                <Link
                  className="w-full hover:cursor-pointer text-purple-500 font-medium flex flex-row gap-5 items-center"
                  href={item.href}
                  size="lg"
                >
                  {item.display == "Home" && (
                    <FontAwesomeIcon
                      icon={faHouse}
                      className="flex  justify-center"
                    />
                  )}
                  {item.display == "Dashboard" && (
                    <FontAwesomeIcon icon={faTableColumns} />
                  )}
                  {item.display == "Admit" && (
                    <FontAwesomeIcon icon={faHospitalUser} />
                  )}
                  <div className="">{item.display}</div>
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      )}
    </>
  );
};

export default Nav;
