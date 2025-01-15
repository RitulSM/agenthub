import { ReactNode } from "react"
import Link from "next/link"
import { Building2, LayoutDashboard, ShoppingCart, Globe2, Settings, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6" />
            <span className="text-xl font-bold">AgentHub</span>
          </Link>
        </div>
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/orders"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/market"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800"
              >
                <Globe2 className="h-5 w-5" />
                <span>Market View</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-4 left-4">
          <Button variant="ghost" className="text-white hover:bg-gray-800">
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}

