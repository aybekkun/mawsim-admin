import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const popularDishes = [
  { name: "Spaghetti Carbonara", orders: 120 },
  { name: "Margherita Pizza", orders: 95 },
  { name: "Grilled Salmon", orders: 80 },
  { name: "Caesar Salad", orders: 75 },
  { name: "Beef Burger", orders: 70 },
]

const inventoryLevels = [
  { item: "Tomatoes", quantity: 50, unit: "kg" },
  { item: "Chicken", quantity: 30, unit: "kg" },
  { item: "Pasta", quantity: 40, unit: "kg" },
  { item: "Cheese", quantity: 25, unit: "kg" },
  { item: "Lettuce", quantity: 20, unit: "kg" },
]

const foodCostDistribution = [
  { category: "Meat", value: 35 },
  { category: "Vegetables", value: 25 },
  { category: "Dairy", value: 20 },
  { category: "Grains", value: 15 },
  { category: "Others", value: 5 },
]

export default function Chart1() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Restaurant Food Dashboard</h1>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">237</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Food Cost Percentage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Dishes Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Most Popular Dishes</CardTitle>
          <CardDescription>Top 5 dishes by number of orders</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              orders: {
                label: "Orders",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popularDishes}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="orders" fill="var(--color-orders)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Inventory Levels Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Inventory Levels</CardTitle>
          <CardDescription>Stock levels of key ingredients</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryLevels.map((item) => (
                <TableRow key={item.item}>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Food Cost Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Food Cost Distribution</CardTitle>
          <CardDescription>Breakdown of food costs by category</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Percentage",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={foodCostDistribution}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="var(--color-value)"
                  label
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}