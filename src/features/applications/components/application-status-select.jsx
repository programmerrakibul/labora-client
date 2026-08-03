import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APPLICATION_STATUS, getEnumByValue } from "@/constants/enums";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUpdateApplicationStatus } from "../hooks/use-applications";

const STATUS_OPTIONS = Object.values(APPLICATION_STATUS).filter(
  (s) => s.value !== "WITHDRAWN",
);

const ApplicationStatusSelect = ({ applicationId, status, className }) => {
  const updateStatus = useUpdateApplicationStatus();
  const current = getEnumByValue(APPLICATION_STATUS, status);

  const handleChange = (value) => {
    updateStatus.mutate(
      { id: applicationId, status: value },
      {
        onError: (err) => {
          toast.error(err?.response?.data?.error || "Failed to update status");
        },
      },
    );
  };

  return (
    <Select
      value={status}
      onValueChange={handleChange}
      items={STATUS_OPTIONS.map((s) => s.value)}
      disabled={updateStatus.isPending}
    >
      <SelectTrigger className={cn("gap-2", className)}>
        <span className={cn("size-2 rounded-full", current?.color)} />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            <div className="flex items-center gap-2">
              <span className={cn("size-2 rounded-full", status.color)} />
              <span className="truncate line-clamp-1">{status.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ApplicationStatusSelect;
