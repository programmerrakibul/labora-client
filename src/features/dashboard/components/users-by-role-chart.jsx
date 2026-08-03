import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";

const buildConfig = (data) =>
  Object.fromEntries(
    data.map((entry, index) => [
      entry.name,
      { label: entry.name, color: `var(--chart-${(index % 5) + 1})` },
    ])
  );

const UsersByRoleChart = ({ title, description, data }) => {
  const config = buildConfig(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[250px] w-full">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" label>
              {data.map((entry) => (
                <Cell key={entry.name} fill={config[entry.name]?.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UsersByRoleChart;
