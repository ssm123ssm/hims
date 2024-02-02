import { Divider } from "@nextui-org/react";
import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const Sidebar = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="h-full mr-4 flex  w-full">
      <div className="flex justify-center items-start w-full">sidebar</div>
    </div>
  );
};

export default Sidebar;
