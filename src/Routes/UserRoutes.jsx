import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";

export const UserRoutes = ({ children }) => {
  const location = useLocation();

  const { loading, role } = useContext(AuthContext);


  if (loading) {
    return (
        <div className="flex items-center justify-center mx-auto">
            <HashLoader color="#ff8a00" size={100} />
        </div>
    );
  }

  if (role == 'user') {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};
