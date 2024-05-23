// import toast from 'react-hot-toast';
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineDocumentChartBar,
  HiOutlinePencilSquare,
  HiOutlineCalendarDays,
  HiOutlinePresentationChartBar,
  HiOutlineDocumentText,
  HiOutlineArrowLeftOnRectangle,
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
        url: "/freelancers/:id",
        icon: HiOutlineUsers,
        label: "Freelancers",
      },

      {
        isLink: true,
        url: "/clients/:id",
        icon: HiOutlineUsers,
        label: "Clients",
      },
      {
        isLink: true,
        url: "/VIPclients/:id",
        icon: HiOutlineUsers,
        label: "VIP Clients",
      },
      {
        isLink: true,
        url: "/projects/:id",
        icon: HiOutlineCube,
        label: "Projects",
      },
      {
        isLink: true,
        url: "/reports/:id",
        icon: HiOutlineDocumentChartBar,
        label: "Reports",
      },
      {
        isLink: true,
        url: "/admins/:id",
        icon: HiOutlineDocumentChartBar,
        label: "Admins",
      },
      {
        isLink: true,
        url: "/orders/:id",
        icon: HiOutlineCube,
        label: "Orders",
      },
      {
        isLink: true,
        url: "/products/:id",
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

  {
    listItems: [
      // {
      //   isLink: true,
      //   url: '/settings',
      //   icon: IoSettingsOutline,
      //   label: 'settings',
      // },
      {
        isLink: true,
        url: "/login",
        icon: HiOutlineArrowLeftOnRectangle,
        label: "log out",
      },
    ],
  },
];
