'use client'

import * as React from "react";
import { useState } from "react";
import { ChevronRight, TrendingUp, BellRing, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Bar, BarChart, CartesianGrid, XAxis,
  Label, Pie, PieChart
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig, ChartContainer, ChartLegend, ChartLegendContent,
  ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


{/* Code for Task Card */ }
export function TaskCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-2">Create Task</h3>
      <p className="text-sm text-gray-500 mb-4">Assign tasks to users!</p>
      <div className="mb-2">
        <label htmlFor="taskName" className="block text-gray-700 text-sm font-bold mb-1">Name</label>
        <Input type="text" id="taskName" placeholder="Task Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-2">
        <label htmlFor="framework" className="block text-gray-700 text-sm font-bold mb-1">Framework</label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="superAdmin">Super Admin</SelectItem>
            <SelectItem value="wasteWorkers">Waste Workers</SelectItem>
            <SelectItem value="households">Households</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end">
        <Button variant="ghost">Cancel</Button>
        <Button>Deploy</Button>
      </div>
    </div>
  );
}

{/* Code for notification card */ }
type CardProps = React.ComponentProps<typeof Card>

export function Notification({ className, ...props }: CardProps) {
  const notifications = [
    {
      title: "Pedro's account invitation has been confirmed.",
      description: "1 hour ago",
    },
    {
      title: "You have a new message!",
      description: "1 hour ago",
    },
    {
      title: "Juan's subscription is expiring soon!",
      description: "2 hours ago",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BellRing className="h-4 w-4" />
          <span>Notifications</span>
        </CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium">Push Notifications</p>
          <Switch id="push-notifications" />
        </div>
        <ul className="space-y-2">
          {notifications.map((notification, index) => (
            <li key={index} className="border rounded-md p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.description}</p>
                </div>
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}


{/* Code for pie chart */ }
export function ChartData() {
  const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
  ];

  const chartConfig: ChartConfig = {
    visitors: { label: "Users" },
    chrome: { label: "Household", color: "hsl(var(--chart-1))" },
    safari: { label: "Waste Workers", color: "hsl(var(--chart-2))" },
    firefox: { label: "Admin", color: "hsl(var(--chart-3))" },
    edge: { label: "Super Admin", color: "hsl(var(--chart-4))" },
    other: { label: "Others/Guests", color: "hsl(var(--chart-5))" },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Number of Users</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
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
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {chartData.reduce((acc, curr) => acc + curr.visitors, 0).toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Users
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total users for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

{/* Code for bar chart */ }
export function Chart() {

  const chartData = [
    { month: "January", user: 186, col_wastes: 80 },
    { month: "February", user: 305, col_wastes: 200 },
    { month: "March", user: 237, col_wastes: 120 },
    { month: "April", user: 73, col_wastes: 190 },
    { month: "May", user: 209, col_wastes: 130 },
    { month: "June", user: 214, col_wastes: 140 },
  ]

  const chartConfig = {
    user: {
      label: "Active Users",
      color: "#FFC539",
    },
    col_wastes: {
      label: "Collected Wastes",
      color: "#038167",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="h-[350px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="user" fill="var(--color-user)" radius={4} />
        <Bar dataKey="col_wastes" fill="var(--color-col_wastes)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });

  const chartData = [
    { month: "January", user: 186, col_wastes: 80 },
    { month: "February", user: 305, col_wastes: 200 },
    { month: "March", user: 237, col_wastes: 120 },
    { month: "April", user: 73, col_wastes: 190 },
    { month: "May", user: 209, col_wastes: 130 },
    { month: "June", user: 214, col_wastes: 140 },
  ]
  const chartConfig = {
    user: {
      label: "user",
      color: "hsl(var(--chart-1))",
    },
    col_wastes: {
      label: "col_wastes",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig


  {/* Code for date picker below dashboard header */ }
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[250px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
{ }



export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white from-primary-50 to-primary-100 flex items-center justify-center p-4">
      {/* show sidebar */}
      <Button
        variant="outline"
        size="icon"
        className="top-10 left-0 z-10 absolute m-14 bg-[#038167] text-white"
        onClick={toggleSidebar}
      >
        <ChevronRight size={24} />
      </Button>

      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-[#038167] dark:bg-gray-800 flex flex-col`} aria-labelledby="drawer-navigation-label"
      >
        <img src="/mare-white-logo.png" alt="Logo" className="h-16 w-auto mt-10" />
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={toggleSidebar}
        >
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto flex-grow">
          <ul className="space-y-2 font-medium flex flex-col justify-start h-full">
            <li>
              <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-coralPink dark:hover:bg-gray-700 group">
                <svg className="shrink-0 w-5 h-5 text-solarGold transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3 text-white group-hover:text-white">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-coralPink dark:hover:bg-gray-700 group">
                <svg className="shrink-0 w-5 h-5 text-solarGold transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-white group-hover:text-white">Mare</span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-coralPink dark:hover:bg-gray-700 group">
                <svg className="shrink-0 w-5 h-5 text-solarGold transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-white">Inbox</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-coralPink dark:hover:bg-gray-700 group">
                <svg className="shrink-0 w-5 h-5 text-solarGold transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-white">Users</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-coralPink dark:hover:bg-gray-700 group">
                <svg className="shrink-0 w-5 h-5 text-solarGold transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                  <path d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
                  <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-white">Incentives</span>
              </Link>
            </li>
            <li className="mt-auto">
              <Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-coralPink dark:hover:bg-gray-700 group">
                <svg className="shrink-0 w-5 h-5 text-solarGold transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-white">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* main content */}
      <div className="absolute top-20 left-32">
        <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">Dashboard</div>
        <DatePickerWithRange className="grid gap-2" />
      </div>

      <div className="absolute top-20 right-32 border-4 rounded-md flex space-x-4 border-[#038167] bg-[#038167] p-4 ring-offset-8">
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">7,052</div>
          <div className="text-xl text-gray-100 dark:text-gray-100">Wastes Collected</div>
        </div>
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">34</div>
          <div className="text-xl text-gray-100 dark:text-gray-100">Active Users</div>
        </div>
      </div>

      <div className="absolute top-48 left-32 border-4 border-emerald-600 rounded-lg p-4"> {/* Charts Container */}
        <div className="py-1">Lorem Ipsum</div>
        <Chart />
        <div className="py-4">
          <div className="py-1">Lorem Ipsum</div>
          <ChartData />
        </div>
      </div>

      <div className="absolute top-48 right-32 py-5"> {/* Pie Chart */}
        <Notification />
        <div className="py-4">
          <TaskCard />
        </div>
      </div>

    </div>
  );
}
