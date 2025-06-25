'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Package, 
  Truck,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

// Mock data untuk dashboard
const mockStats = {
  totalOrders: 1250,
  totalRevenue: 45000000,
  totalCustomers: 890,
  totalProducts: 156,
  ordersToday: 45,
  revenueToday: 1250000,
  pendingOrders: 12,
  completedOrders: 1180
}

const mockRecentOrders = [
  {
    id: 'ORD001',
    customerName: 'John Doe',
    items: 3,
    total: 75000,
    status: 'pending',
    createdAt: '2025-01-25 10:30'
  },
  {
    id: 'ORD002',
    customerName: 'Jane Smith',
    items: 2,
    total: 45000,
    status: 'confirmed',
    createdAt: '2025-01-25 09:15'
  },
  {
    id: 'ORD003',
    customerName: 'Bob Johnson',
    items: 1,
    total: 25000,
    status: 'delivered',
    createdAt: '2025-01-25 08:45'
  }
]

const statusConfig = {
  pending: { label: 'Menunggu', color: 'secondary' },
  confirmed: { label: 'Dikonfirmasi', color: 'default' },
  preparing: { label: 'Dipersiapkan', color: 'default' },
  ready: { label: 'Siap', color: 'default' },
  picked_up: { label: 'Dikirim', color: 'default' },
  delivered: { label: 'Selesai', color: 'default' },
  cancelled: { label: 'Dibatalkan', color: 'destructive' }
}

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/auth/signin')
    }
  }, [user, isAdmin, loading, router])

  if (loading) {
    return (
      <div className="container py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Kelola seluruh aspek SuperApp dari sini
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{mockStats.ordersToday} hari ini
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(mockStats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                +{formatPrice(mockStats.revenueToday)} hari ini
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pelanggan</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalCustomers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Pelanggan terdaftar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Produk aktif
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Pesanan</TabsTrigger>
            <TabsTrigger value="products">Produk</TabsTrigger>
            <TabsTrigger value="customers">Pelanggan</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Pesanan Terbaru</CardTitle>
                  <CardDescription>
                    Pesanan yang masuk hari ini
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{order.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.customerName} • {order.items} item
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDateTime(order.createdAt)}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-sm font-medium">{formatPrice(order.total)}</p>
                          <Badge variant={statusConfig[order.status as keyof typeof statusConfig]?.color as any}>
                            {statusConfig[order.status as keyof typeof statusConfig]?.label}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Aksi Cepat</CardTitle>
                  <CardDescription>
                    Akses fitur admin yang sering digunakan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Tambah Produk Baru
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Truck className="h-4 w-4 mr-2" />
                    Kelola Pengiriman
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Manajemen Karyawan
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Laporan Penjualan
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Order Status Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Status Pesanan</CardTitle>
                <CardDescription>
                  Ringkasan status pesanan saat ini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center space-y-2">
                    <Clock className="h-8 w-8 mx-auto text-yellow-500" />
                    <div className="text-2xl font-bold">{mockStats.pendingOrders}</div>
                    <div className="text-sm text-muted-foreground">Menunggu</div>
                  </div>
                  <div className="text-center space-y-2">
                    <Package className="h-8 w-8 mx-auto text-blue-500" />
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-muted-foreground">Diproses</div>
                  </div>
                  <div className="text-center space-y-2">
                    <Truck className="h-8 w-8 mx-auto text-orange-500" />
                    <div className="text-2xl font-bold">15</div>
                    <div className="text-sm text-muted-foreground">Dikirim</div>
                  </div>
                  <div className="text-center space-y-2">
                    <CheckCircle className="h-8 w-8 mx-auto text-green-500" />
                    <div className="text-2xl font-bold">{mockStats.completedOrders}</div>
                    <div className="text-sm text-muted-foreground">Selesai</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Pesanan</CardTitle>
                <CardDescription>
                  Kelola semua pesanan yang masuk
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Fitur manajemen pesanan akan segera tersedia
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Produk</CardTitle>
                <CardDescription>
                  Kelola produk, kategori, dan inventori
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Fitur manajemen produk akan segera tersedia
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Pelanggan</CardTitle>
                <CardDescription>
                  Kelola data pelanggan dan riwayat pembelian
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Fitur manajemen pelanggan akan segera tersedia
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Sistem</CardTitle>
                <CardDescription>
                  Konfigurasi aplikasi dan pengaturan umum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Fitur pengaturan sistem akan segera tersedia
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}