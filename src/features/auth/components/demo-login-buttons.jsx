import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Building2, UserRound } from "lucide-react";

const demoAccounts = [
  {
    label: "Job Seeker",
    icon: UserRound,
    email: import.meta.env.DEMO_JOB_SEEKER_EMAIL,
    password: import.meta.env.DEMO_JOB_SEEKER_PASSWORD,
  },
  {
    label: "Recruiter",
    icon: Building2,
    email: import.meta.env.DEMO_RECRUITER_EMAIL,
    password: import.meta.env.DEMO_RECRUITER_PASSWORD,
  },
].filter((account) => account.email && account.password);

const DemoLoginButtons = ({ onFill, className }) => {
  if (demoAccounts.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-center text-sm font-medium text-muted-foreground">
        Try a demo account
      </p>
      <div className="grid grid-cols-2 gap-3">
        {demoAccounts.map((account) => (
          <Button
            key={account.label}
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => onFill(account.email, account.password)}
          >
            <account.icon />
            Demo {account.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DemoLoginButtons;
