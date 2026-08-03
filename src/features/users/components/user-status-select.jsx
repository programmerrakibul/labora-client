import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToggleUserStatus } from "../hooks/use-users";

const USER_STATUS_OPTIONS = [
  {
    value: "active",
    label: "Active",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  {
    value: "inactive",
    label: "Inactive",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
];

const UserStatusSelect = ({ userId, isActive, className }) => {
  const toggleStatus = useToggleUserStatus();
  const value = isActive ? "active" : "inactive";
  const current = USER_STATUS_OPTIONS.find((s) => s.value === value);

  const handleChange = (nextValue) => {
    toggleStatus.mutate({ id: userId, isActive: nextValue === "active" });
  };

  return (
    <Select
      value={value}
      onValueChange={handleChange}
      items={USER_STATUS_OPTIONS.map((s) => s.value)}
      disabled={toggleStatus.isPending}
    >
      <SelectTrigger className={cn("gap-2", className)}>
        <span className={cn("size-2 rounded-full", current?.color)} />
        <SelectValue className={"capitalize"} />
      </SelectTrigger>
      <SelectContent>
        {USER_STATUS_OPTIONS.map((status) => (
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

export default UserStatusSelect;
