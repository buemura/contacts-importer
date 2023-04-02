import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/auth/login";
import { RegisterPage } from "../pages/auth/register";
import { ContactsPage } from "../pages/contacts";
import { HomePage } from "../pages/home";
import { ImportPage } from "../pages/import";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/auth/login", element: <LoginPage /> },
      { path: "/auth/register", element: <RegisterPage /> },
      { path: "/import", element: <ImportPage /> },
      { path: "/contacts", element: <ContactsPage /> },
    ],
  },
]);
