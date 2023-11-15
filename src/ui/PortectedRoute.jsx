import { useNavigate } from "react-router-dom";
import useUser from "../features/log-in-out/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

const PortectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, data: user } = useUser();
  // console.log(user);
  const isAuthenticated = user?.role === "authenticated";
  // console.log(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (!isAuthenticated || isLoading) return <Spinner />;

  if (isAuthenticated) return <>{children}</>;
};

export default PortectedRoute;
