import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import RestaurantDetalis from "./pages/Restaurant/RestaurantDetalis.jsx";
import Review from "./pages/Restaurant/Review.jsx";
import { Home } from "./pages/Home/Home.jsx";
import AuthProviders from "./providers/AuthProviders/AuthProviders.jsx";
import { ViewMenu } from "./pages/RestOwnerDashboard/ViewMenu/ViewMenu.jsx";
import { EditProfile } from "./pages/RestOwnerDashboard/EditProfile/EditProfile.jsx";
import { OwnerProfile } from "./pages/RestOwnerDashboard/OwnerProfile/OwnerProfile.jsx";
import { AutocompleteProvider } from "./providers/AutoComplete/AutoComplete.jsx";
import { ResturantRoutes } from "./Routes/ResturantRoutes.jsx";
import Message from "./pages/Message/Message.jsx";
import Menue from "./pages/Restaurant/Menue.jsx";
// import { PrivateRoutes } from "./Routes/PrivateRoutes.jsx";
import RestProfile from "./pages/RestOwnerDashboard/RestProfile.jsx";
import AddItems from "./pages/RestOwnerDashboard/AddItems.jsx";
import UserContextProvider from "./providers/UserContextProvider.jsx";
import Permission from "./pages/Restaurant/Permission.jsx";
import RestaurantPagination from "./components/RestaurantPagination/RestaurantPagination.jsx";
import ErrorPage from '../src/error/ErrorPage.jsx'
import { AdminRoutes } from "./Routes/AdminRoutes.jsx";
// import { UserRoutes } from "./Routes/UserRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {                                               
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/homes",
        element: <RestaurantPagination />,
      },
      {
        path: "/Restaurant/:id",
        element: <RestaurantDetalis />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_KEY}all-restaurants/${params.id}`),
        children: [
          {
            path: "menu",
            element: <Menue />,
          },
          {
            path: "FoodReview",
            element: <Review />,
          },
        ],
      },
    ],
  },
  {
    path: "view-menus",
    element: <ResturantRoutes><ViewMenu /></ResturantRoutes>,
  },
  {
    path: "/rest-profile/:id",
    element: <RestProfile />,
  
    loader: ({ params }) =>
      fetch(`${import.meta.env.VITE_API_KEY}user/${params.id}`),
    children: [
      {
        path: "AddItems",
        element: (
          <ResturantRoutes>
            <AddItems />
          </ResturantRoutes>
        ),
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "permission",
        element: (
          <AdminRoutes>
            <Permission />
          </AdminRoutes>
        ),
      },
      {
        path: "owner-profile",
        element: (
          <ResturantRoutes>
            <OwnerProfile />
          </ResturantRoutes>
        ),
      },
      {
        path: "message",
        element: <Message />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AutocompleteProvider>
    <AuthProviders>
      <UserContextProvider>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </UserContextProvider>
    </AuthProviders>
  </AutocompleteProvider>
);
