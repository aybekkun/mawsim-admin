import { Bar, BarChart, Line, LineChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, DollarSign, TrendingUp, AlertTriangle } from "lucide-react"

// Sample data
const inventoryData = [
  { category: "Produce", current: 120, ideal: 150 },
  { category: "Meat", current: 80, ideal: 100 },
  { category: "Dairy", current: 60, ideal: 75 },
  { category: "Grains", current: 90, ideal: 80 },
  { category: "Beverages", current: 150, ideal: 120 },
]

const popularItemsData = [
  { name: "Tomatoes", quantity: 50 },
  { name: "Chicken", quantity: 30 },
  { name: "Cheese", quantity: 40 },
  { name: "Rice", quantity: 60 },
  { name: "Wine", quantity: 25 },
]

const recentMovements = [
  { id: 1, item: "Lettuce", quantity: 20, type: "Received", date: "2023-06-01" },
  { id: 2, item: "Beef", quantity: 15, type: "Used", date: "2023-06-02" },
  { id: 3, item: "Milk", quantity: 30, type: "Received", date: "2023-06-03" },
  { id: 4, item: "Pasta", quantity: 25, type: "Used", date: "2023-06-04" },
  { id: 5, item: "Soda", quantity: 40, type: "Received", date: "2023-06-05" },
]

export default function Chart1() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">информация об складе</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,560</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Turnover Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.7</div>
            <p className="text-xs text-muted-foreground">Turns per month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Levels</CardTitle>
            <CardDescription>Current vs Ideal Stock Levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                current: {
                  label: "Current Stock",
                  color: "hsl(var(--chart-1))",
                },
                ideal: {
                  label: "Ideal Stock",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={inventoryData}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="current" fill="var(--color-current)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ideal" fill="var(--color-ideal)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Popular Items</CardTitle>
            <CardDescription>Most Used Items in Last 30 Days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                quantity: {
                  label: "Quantity Used",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <LineChart data={popularItemsData}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="quantity" stroke="var(--color-quantity)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Stock Movements</CardTitle>
          <CardDescription>Last 5 Inventory Transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentMovements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{movement.item}</TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell>{movement.type}</TableCell>
                  <TableCell>{movement.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}