import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEnumByValue, JOB_STATUS } from "@/constants/enum-configs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUpdateJobStatus } from "../hooks/use-jobs";

const JobStatusSelect = ({ jobId, status, className }) => {
  const updateStatus = useUpdateJobStatus();
  const current = getEnumByValue(JOB_STATUS, status);

  const handleChange = (value) => {
    updateStatus.mutate(
      { id: jobId, status: value },
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
      items={Object.values(JOB_STATUS).map((s) => s.value)}
      disabled={updateStatus.isPending}
    >
      <SelectTrigger className={cn("gap-2", className)}>
        <span className={cn("size-2 rounded-full", current?.color)} />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(JOB_STATUS).map((status) => (
          <SelectItem key={status.value} value={status.value}>
            <div className="flex items-center gap-2">
              <span className={cn("size-2 rounded-full", status.color)} />
              <span>{status.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default JobStatusSelect;
