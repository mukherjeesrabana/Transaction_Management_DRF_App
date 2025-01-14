import { useMemo, useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

// Utility function to filter routes by role
const getRoutesByRole = (routes, role) => {
  return routes.filter((route) => {
    if (route.roles && !route.roles.includes(role)) {
      return false;
    }
    if (route.collapse) {
      route.collapse = getRoutesByRole(route.collapse, role);
      return route.collapse.length > 0;
    }
    return true;
  });
};

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { layout, sidenavColor, transparentSidenav, whiteSidenav, darkMode } = controller;
  const { pathname } = useLocation();

  // State to manage userRole
  const [userRole, setUserRole] = useState(null);

  // Fetch user role from sessionStorage
  useEffect(() => {
    const role = sessionStorage.getItem("usertype") || "guest";
    setUserRole(role);
  }, []);

  // Filter routes based on user role
  const filteredRoutes = useMemo(() => {
    return userRole ? getRoutesByRole(routes, userRole) : [];
  }, [userRole]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  // Show a loading state until userRole is fetched
  if (!userRole) {
    return <div>Loading...</div>; // Replace with a spinner or loading component if desired
  }

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          routes={filteredRoutes} // Pass filtered routes to Sidenav
        />
      )}
      <Routes>
        {getRoutes(filteredRoutes)} {/* Render filtered routes */}
      </Routes>
      {layout === "vr" && <Configurator />}
    </ThemeProvider>
  );
}
