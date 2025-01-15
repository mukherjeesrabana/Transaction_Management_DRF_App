// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Transaction from "layouts/expense_tracker/transaction/Transaction";
import Category from "layouts/expense_tracker/category/Category";
import Reports from "layouts/expense_tracker/reports/Reports";

// @mui icons
import Icon from "@mui/material/Icon";
import User from "layouts/user/User";
import AdminDashboard from "layouts/admindashboard/AdminDashboard";
import SubCategory from "layouts/expense_tracker/subcategory/SubCategory";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    roles: ["Standard User"], // Accessible to admin and user
  },
  {
    type: "collapse",
    name: "Add Transactions",
    key: "transactions",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/transactions",
    component: <Transaction />,
    roles: ["Standard User"], // Accessible only to admin
  },

  {
    type: "collapse",
    name: "Add Categories",
    key: "categories",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/categories",
    component: <Category />,
    roles: ["Standard User"], // Accessible only to admin
  },
  {
    type: "collapse",
    name: "Add Sub-Categories",
    key: "subcategories",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/subcategories",
    component: <SubCategory />,
    roles: ["Standard User"], // Accessible only to admin
  },
  {
    type: "collapse",
    name: "Reports",
    key: "reports",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/reports",
    component: <Reports />,
    roles: ["Standard User"], // Accessible to admin and user
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "admindashbooard",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/admin-dashboard",
    component: <AdminDashboard />,
    roles: ["Admin User"], // Accessible to admin and user
  },
  {
    type: "collapse",
    name: "User Management",
    key: "user",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/users",
    component: <User />,
    roles: ["Admin User"], // Accessible to admin and user
  },
  {
    type: "collapse",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
    roles: ["guest"], // Accessible to guests
  },
  {
    type: "collapse",
    key: "sign-up",
    route: "/authentication/sign-up",
    component: <SignUp />,
    roles: ["guest"], // Accessible to guests
  },
];

export default routes;
