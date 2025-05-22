import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurschasedCoursesQuery } from "@/features/api/purchaseApi";
import { useTheme } from "@/components/ThemeProvider"; // adjust the path as needed

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const Dashboard = () => {
  const { theme } = useTheme();

  const { data, isSuccess, isError, isLoading } =
    useGetPurschasedCoursesQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError)
    return <h1 className="text-red-500">Failed to get purchased course</h1>;

  const { purchasedCourse } = data || [];

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));

  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );

  const totalSales = purchasedCourse.length;
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalRevenue}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={courseData} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis
                dataKey="name"
                angle={-25}
                textAnchor="end"
                interval={0}
                stroke="currentColor"
                tick={{ fill: "currentColor" }}
              />
              <YAxis stroke="currentColor" tick={{ fill: "currentColor" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg)",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border-color)",
                }}
                labelStyle={{ color: "var(--text-color)" }}
                formatter={(value, name) => [`₹${value}`, "Price"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#4f46e5"
                fillOpacity={1}
                fill="url(#colorPrice)"
                strokeWidth={3}
                dot={{ r: 4, stroke: "#4f46e5", strokeWidth: 2, fill: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
