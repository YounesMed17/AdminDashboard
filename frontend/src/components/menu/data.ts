// import toast from 'react-hot-toast';
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineDocumentChartBar,
} from "react-icons/hi2";
// import { IoSettingsOutline } from 'react-icons/io5';

export const menu = [
  {
    catalog: "main",
    listItems: [
      {
        isLink: true,
        url: "/",
        icon: HiOutlineHome,
        label: "homepage",
      },
      {
        isLink: true,
        url: "/profile",
        icon: HiOutlineUser,
        label: "profile",
      },
    ],
  },
  {
    catalog: "lists",
    listItems: [
      {
        isLink: true,
        url: "/freelancers",
        icon: HiOutlineUsers,
        label: "Freelancers",
      },

      {
        isLink: true,
        url: "/clients",
        icon: HiOutlineUsers,
        label: "Clients",
      },
      {
        isLink: true,
        url: "/VIPclients",
        icon: HiOutlineUsers,
        label: "VIP Clients",
      },
      {
        isLink: true,
        url: "/projects",
        icon: HiOutlineCube,
        label: "Projects",
      },
      {
        isLink: true,
        url: "/reports",
        icon: HiOutlineDocumentChartBar,
        label: "Reports",
      },
      {
        isLink: true,
        url: "/admins",
        icon: HiOutlineDocumentChartBar,
        label: "Admins",
      },
      {
        isLink: true,
        url: "/orders",
        icon: HiOutlineCube,
        label: "Orders",
      },
      {
        isLink: true,
        url: "/products",
        icon: HiOutlineCube,
        label: "Products",
      },
      {
        isLink: true,
        url: "/chatRooms/:id",
        icon: HiOutlineCube,
        label: "Chat Rooms",
      },
    ],
  },
];
