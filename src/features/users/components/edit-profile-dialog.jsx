import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import EditProfileForm from "./edit-profile-form";

const EditProfileDialog = ({ open, onOpenChange }) => {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-xl p-0">
      <div className="overflow-hidden rounded-lg">
        <ScrollArea className="max-h-[80dvh] w-full">
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b bg-background px-5 py-4 sm:px-6 sm:py-5">
            <DialogTitle className="text-xl">Edit Profile</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground"
              onClick={() => onOpenChange(false)}
              aria-label="Close edit profile"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <EditProfileForm
              onCancel={() => onOpenChange(false)}
              onSuccess={() => onOpenChange(false)}
            />
          </div>
        </ScrollArea>
      </div>
    </Dialog>
  );
};

export default EditProfileDialog;
