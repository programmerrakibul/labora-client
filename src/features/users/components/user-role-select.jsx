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

const UserRoleSelect = ({ userId, role, className }) => {
  const updateRole = useUpdateUserRole();

  const handleChange = (nextValue) => {
    updateRole.mutate({ id: userId, role: nextValue });
  };

  return (
    <Select
      value={role}
      onValueChange={handleChange}
      disabled={updateRole.isPending}
    >
      <SelectTrigger className={cn("gap-2", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        {[USER_ROLE.JOB_SEEKER, USER_ROLE.ADMIN].map((r) => (
          <SelectItem key={r} value={r}>
            {r}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserRoleSelect;
