"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Daily work data
const chartData = [
  { id: 1, name: "Searching New Job", value: 2, fill: "#3b82f6" },
  { id: 2, name: "Clearing doubts", value: 0.5, fill: "#713f12" },
  {
    id: 3,
    name: "Convert design to live - Task 1",
    value: 2.5,
    fill: "#4ade80",
  },
  { id: 4, name: "Girlfriend time", value: 0.5, fill: "#fb923c" },
  {
    id: 5,
    name: "Convert design to live - Task 2",
    value: 2.5,
    fill: "#4ade80",
  },
  { id: 6, name: "Read a book or blog", value: 0.5, fill: "#9f1239" },
  {
    id: 7,
    name: "Convert design to live - Task 3",
    value: 3.5,
    fill: "#4ade80",
  },
  {
    id: 8,
    name: "Bug fixing and enhancing code",
    value: 2,
    fill: "#6d28d9",
  },
  {
    id: 9,
    name: "Watching movies or series",
    value: 1.5,
    fill: "#fef08a",
  },
  {
    id: 10,
    name: "Sleeping",
    value: 7,
    fill: "#9d174d",
  },
  {
    id: 10,
    name: "Other Works",
    value: 1.5,
    fill: "#0c4a6e",
  },
];

// Chart configuration for daily tasks
const chartConfig: any = {
  "Searching New Job": { label: "Searching New Job", color: "#3b82f6" },
  "Clearing doubts": { label: "Clearing doubts", color: "#713f12" },
  "Convert design to live - Task 1": {
    label: "Convert design to live - Task 1",
    color: "#4ade80",
  },
  "Girlfriend time": { label: "Girlfriend time", color: "#fb923c" },
  "Convert design to live - Task 2": {
    label: "Convert design to live - Task 2",
    color: "#4ade80",
  },
  "Read a book or blog": {
    label: "Read a book or blog",
    color: "#9f1239",
  },
  "Convert design to live - Task 3": {
    label: "Convert design to live - Task 3",
    color: "#4ade80",
  },
  "Bug-fixing-and-enhancing-code": {
    label: "Bug fixing and enhancing code",
    color: "#6d28d9",
  },
  "Watching movies or series": {
    label: "Watching movies or series",
    color: "#fef08a",
  },
  Sleeping: {
    label: "Sleeping",
    color: "#9d174d",
  },
  "Other Works": {
    label: "Other Works",
    color: "#0c4a6e",
  },
};

export default function Component() {
  const id = "pie-daily-work";
  const [activeTask, setActiveTask] = React.useState(chartData[0].name);

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.name === activeTask),
    [activeTask]
  );

  const tasks = React.useMemo(() => chartData.map((item) => item.name), []);

  return (
    <Card
      data-chart={id}
      className="flex flex-col w-[300px] md:w-[500px] shadow-none rounded-none border-0 bg-transparent"
    >
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex flex-col items-start space-y-2 pb-2">
        <Select value={activeTask} onValueChange={setActiveTask}>
          <SelectTrigger
            className="ml-auto h-7 w-[200px] rounded-lg"
            aria-label="Select a task"
          >
            <SelectValue placeholder="Select task" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {tasks.map((task) => {
              const config = chartConfig[task];

              if (!config) {
                return null;
              }

              return (
                <SelectItem key={task} value={task} className="rounded-lg">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 rounded-sm"
                      style={{
                        backgroundColor: config.color,
                      }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[500px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl font-bold text-black dark:text-white"
                        >
                          {chartData[activeIndex].value}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-black dark:text-white"
                        >
                          Hours
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
