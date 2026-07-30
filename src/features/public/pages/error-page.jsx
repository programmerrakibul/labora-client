import { useRouteError, Link } from "react-router";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary">Oops!</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        {error?.status === 404 ? "Page not found" : "Something went wrong"}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        {error?.statusText || error?.message || "An unexpected error occurred"}
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
