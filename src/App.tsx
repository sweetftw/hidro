import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart } from "recharts";

import "./App.css";

function App() {
  //const [count, setCount] = useState(0)

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center p-48">
      <h1>Teste</h1>
      <div className="w-full flex justify-center items-center">
        <div className="w-full">
          <ChartContainer
            config={chartConfig}
            className="min-h-[700px] w-full max-w-[1000px] border-2 border-gray-200 rounded-lg"
          >
            <LineChart accessibilityLayer data={chartData}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <CartesianGrid vertical={false} />
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="#ff0000"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                type="monotone"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <div className="w-full h-full flex flex-col justify-start items-center">
          <h2>botoes</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
