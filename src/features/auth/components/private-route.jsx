import useAuth from "@/stores/auth";
import { Navigate, useLocation, useSearchParams } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const to = encodeURIComponent(`${pathname}?${searchParams.toString()}`);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/auth/login?to=${to}`} replace />;
  }

  return children;
};

export default PrivateRoute;
