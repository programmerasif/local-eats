import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";

export const PrivateRoutes = ({ children }) => {
  const location = useLocation();

  const { loading, user } = useContext(AuthContext);


  if (loading) {
    return (
        <div className="flex items-center justify-center mx-auto">
            <HashLoader color="#ff8a00" size={100} />
        </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/sign-up" state={{ from: location }} replace />;
};
