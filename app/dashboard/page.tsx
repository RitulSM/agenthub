import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { ArrowUpDown, ShoppingCart, TrendingUp, Globe2, MapPin } from 'lucide-react'
  
  export default function DashboardPage() {
    return (
      <div className="space-y-6">
        {/* Subscription Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>State View Subscription</CardTitle>
                <CardDescription>Your current subscription plan</CardDescription>
              </div>
              <Badge variant="secondary" className="text-blue-600 bg-blue-100">
                State Access
              </Badge>
            </div>
          </CardHeader>
        </Card>
  
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Buy Orders</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+8 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sell Orders</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67</div>
              <p className="text-xs text-muted-foreground">+4 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
        </div>
  
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest buy and sell orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-600">Buy</Badge>
                  <div>
                    <p className="text-sm font-medium">Apples</p>
                    <p className="text-sm text-muted-foreground">Client: John Smith</p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                    <p className="text-sm font-medium">$1,000</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-600">Sell</Badge>
                  <div>
                    <p className="text-sm font-medium">Potato</p>
                    <p className="text-sm text-muted-foreground">Client: Sarah Johnson</p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <Globe2 className="h-4 w-4 mr-2 text-slate-400" />
                    <p className="text-sm font-medium">$20,000</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Order Activity</CardTitle>
              <CardDescription>Recent updates on your orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div>
                    <p className="text-sm">New buy order submitted</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div>
                    <p className="text-sm">Sell order completed</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <div>
                    <p className="text-sm">Order negotiation started</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  
  