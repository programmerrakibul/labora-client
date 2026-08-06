import { useRouteError, Link } from "react-router";
import Seo from "@/components/shared/seo";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  const error = useRouteError();
  const isNotFound = error?.status === 404;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Seo
        title={isNotFound ? "Page Not Found" : "Something Went Wrong"}
        noindex
        description="The page you are looking for could not be found or something went wrong. Head back to the Labora homepage to continue browsing jobs."
      />
      <h1 className="text-6xl font-bold text-primary">Oops!</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        {isNotFound ? "Page not found" : "Something went wrong"}
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
