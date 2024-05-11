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
    ],
  },
  {
    catalog: "general",
    listItems: [
      {
        isLink: true,
        url: "/notes",
        icon: HiOutlinePencilSquare,
        label: "notes",
      },
      {
        isLink: true,
        url: "/calendar",
        icon: HiOutlineCalendarDays,
        label: "calendar",
      },
    ],
  },
  {
    catalog: "analytics",
    listItems: [
      {
        isLink: true,
        url: "/charts",
        icon: HiOutlinePresentationChartBar,
        label: "charts",
      },
      {
        isLink: true,
        url: "/logs",
        icon: HiOutlineDocumentText,
        label: "logs",
      },
    ],
  },
  {
    catalog: "miscellaneous",
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
