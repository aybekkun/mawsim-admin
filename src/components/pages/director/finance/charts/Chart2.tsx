import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const revenueData = [
  { year: "2019", revenue: 5000000, profit: 1500000 },
  { year: "2020", revenue: 5500000, profit: 1700000 },
  { year: "2021", revenue: 6200000, profit: 2000000 },
  { year: "2022", revenue: 7000000, profit: 2300000 },
  { year: "2023", revenue: 7800000, profit: 2600000 },
]

export default function Chart2() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Annual Revenue and Profit</CardTitle>
        <CardDescription>ACME Corp. financial performance over 5 years</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
            profit: {
              label: "Profit",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
              <Bar dataKey="profit" fill="var(--color-profit)" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}