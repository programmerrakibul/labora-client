import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const JobFormCard = ({ children, title }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};

export default JobFormCard;
