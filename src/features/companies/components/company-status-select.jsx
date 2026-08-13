import { COMPANY_STATUS_CONFIG } from "@/constants/enum-configs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useUpdateCompanyStatus } from "../hooks/use-companies";

const STATUS_OPTIONS = Object.values(COMPANY_STATUS_CONFIG);

const CompanyStatusSelect = ({ companyId, status, className }) => {
  const updateStatus = useUpdateCompanyStatus();
  const current = COMPANY_STATUS_CONFIG[status];

  const handleChange = (nextValue) => {
    updateStatus.mutate({ id: companyId, status: nextValue });
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
        <SelectValue className={"capitalize"} />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        {STATUS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              <span className={cn("size-2 rounded-full", option.color)} />
              <span className="truncate line-clamp-1">{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CompanyStatusSelect;
