import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_ROLE } from "@/constants/enums";
import { cn } from "@/lib/utils";
import { useUpdateUserRole } from "../hooks/use-users";

const USER_ROLE_OPTIONS = Object.values(USER_ROLE);

const UserRoleSelect = ({ userId, role, className }) => {
  const updateRole = useUpdateUserRole();
  const current = USER_ROLE_OPTIONS.find((r) => r.value === role);

  const handleChange = (nextValue) => {
    updateRole.mutate({ id: userId, role: nextValue });
  };

  return (
    <Select
      value={role}
      onValueChange={handleChange}
      items={USER_ROLE_OPTIONS.map((r) => r.value)}
      disabled={updateRole.isPending}
    >
      <SelectTrigger className={cn("gap-2", className)}>
        <span className={cn("size-2 rounded-full", current?.color)} />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {USER_ROLE_OPTIONS.map((r) => (
          <SelectItem key={r.value} value={r.value}>
            <div className="flex items-center gap-2">
              <span className={cn("size-2 rounded-full", r.color)} />
              <span className="truncate line-clamp-1">{r.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserRoleSelect;
