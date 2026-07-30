import { FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = ({ message = "No data found", icon: Icon, action, actionLabel }) => {
  const DisplayIcon = Icon || FolderSearch;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <DisplayIcon className="h-10 w-10 text-muted-foreground" />
      </div>
      <p className="text-lg font-medium text-foreground">{message}</p>
      {action && actionLabel && (
        <Button onClick={action} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default NotFound;
