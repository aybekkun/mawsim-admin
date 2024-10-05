import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const stockData = [
  { date: "2023-01-01", price: 150 },
  { date: "2023-02-01", price: 155 },
  { date: "2023-03-01", price: 159 },
  { date: "2023-04-01", price: 165 },
  { date: "2023-05-01", price: 168 },
  { date: "2023-06-01", price: 172 },
  { date: "2023-07-01", price: 178 },
  { date: "2023-08-01", price: 180 },
]

export default function Chart1() {
  return (
    <Card className="flex-1 ">
      <CardHeader>
        <CardTitle>Дохаоды</CardTitle>
        <CardDescription>ACME Corp. stock price over the last 8 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            price: {
              label: "Stock Price",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={stockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="price" stroke="var(--color-price)" name="Stock Price" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}