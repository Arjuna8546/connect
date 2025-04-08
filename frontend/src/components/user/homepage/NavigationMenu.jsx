"use client";
import React from "react";
import MenuItem from "./MenuItem";
import {
  CarIcon,
  TelegramIcon,
  DiscourseIcon,
  ProfileIcon,
  PayPalIcon,
  LogoutIcon,
} from "./Icons";

const NavigationMenu = () => {
  const menuItems = [
    {
      icon: CarIcon,
      label: "booked rides",
      onClick: () => console.log("Booked rides clicked"),
    },
    {
      icon: TelegramIcon,
      label: "your rides",
      onClick: () => console.log("Your rides clicked"),
    },
    {
      icon: DiscourseIcon,
      label: "inbox",
      onClick: () => console.log("Inbox clicked"),
    },
    {
      icon: ProfileIcon,
      label: "Profile",
      onClick: () => console.log("Profile clicked"),
    },
    {
      icon: PayPalIcon,
      label: "Payments",
      onClick: () => console.log("Payments clicked"),
    },
    {
      icon: LogoutIcon,
      label: "log out",
      onClick: () => console.log("Logout clicked"),
    },
  ];

  return (
    <nav className="w-80 bg-white border border-solid border-b-[none] border-neutral-400 max-sm:w-full">
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          label={item.label}
          onClick={item.onClick}
        />
      ))}
    </nav>
  );
};

export default NavigationMenu;
