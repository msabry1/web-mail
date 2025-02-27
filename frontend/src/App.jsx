import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ContactsProvider } from "./context/ContactsContext";
import { useUser } from "./context/UserContext";
import Login from "./components/login-signup/Login";
import Signup from "./components/login-signup/Signup";
import Home from "./components/my-ui/Home";
import Body from "./components/my-ui/Body";
import MailsList from "./components/mails/mails-list/MailsList";
import MailDetails from "./components/mails/MailDetails";
import ContactsPage from "./components/ContactsPage";
import PropTypes from "prop-types";
import { Toaster } from "sonner";
import { AuthProvider } from "./hooks/useAuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUser();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </UserProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <ContactsProvider>
            <Body />
          </ContactsProvider>
        ),
        children: [
          {
            path: "/",
            element: <MailsList />,
          },
          {
            path: "/email/:id",
            element: <MailDetails />,
          },
          {
            path: "/contacts",
            element: <ContactsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <UserProvider>
        <Login />
      </UserProvider>
    ),
  },
  {
    path: "/signup",
    element: (
      <UserProvider>
        <Signup />
      </UserProvider>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Toaster position="top-center" richColors className="toaster-container" />
    </>
  );
}

export default App;
