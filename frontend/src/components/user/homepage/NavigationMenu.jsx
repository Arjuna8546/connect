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
  LoginIconBlack,
  WalletIcon
} from "./Icons";
import { logout } from "../../../Endpoints/APIs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, deleteVehicles } from "../../../store/slices/UserSlice";
import { disconnectSocket } from "../../../service/webSocket";
import { showSuccess } from "../../../utils/toastUtils";



const NavigationMenu = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user.user)
  const baseMenuItems = [
    {
      icon: CarIcon,
      label: "booked rides",
      onClick: () => nav('/yourbookings'),
    },
    {
      icon: TelegramIcon,
      label: "your rides",
      onClick: () => nav('/yourrides'),
    },
    {
      icon: DiscourseIcon,
      label: "inbox",
      onClick: () => nav('/chat'),
    },
    {
      icon: ProfileIcon,
      label: "Profile",
      onClick: () => nav('/profile'),
    },
    {
      icon: WalletIcon,
      label: "Wallet",
      onClick: () => nav('/wallet'),
    },
        {
      icon: PayPalIcon,
      label: "Payments",
      onClick: () => nav('/transactions'),
    },
  ];

  const authMenuItem = user
    ? {
        icon: LogoutIcon,
        label: "log out",
        onClick: async () => {
          await logout();
          dispatch(deleteUser());
          dispatch(deleteVehicles());
          localStorage.removeItem("user_id")
          nav("/login");
          disconnectSocket()
          showSuccess("logged out successfully")
        },
      }
    : {
        icon: LoginIconBlack,
        label: "log in",
        onClick: () => nav("/login"),
      };

  const menuItems = [...baseMenuItems, authMenuItem];


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
