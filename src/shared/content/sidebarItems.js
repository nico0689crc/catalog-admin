import { BiBox, BiCategory, BiPurchaseTagAlt } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";

const sidebarItems = [
  {
    label: "content.sidebar.products",
    icon: <BiBox />,
    to: "/products",
    entity: "products",
    permission_required: true,
  },
  {
    label: "content.sidebar.categories",
    icon: <BiCategory />,
    to: "/categories",
    entity: "cartegories",
    permission_required: true,
  },
  {
    label: "content.sidebar.tags",
    icon: <BiPurchaseTagAlt />,
    to: "/tags",
    entity: "tags",
    permission_required: true,
  },
  {
    label: "content.sidebar.users",
    icon: <HiOutlineUsers />,
    to: "/users",
    entity: "users",
    permission_required: true,
  },
  {
    label: "content.sidebar.settings",
    icon: <FiSettings />,
    to: "/settings",
    entity: "settings",
    permission_required: false,
  },
];

export default sidebarItems;
