'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react'
import { toast } from 'sonner'

// Mock tracking data
const mockTrackingData = {
  'ORD123': {
    orderNumber: 'ORD123',
    status: 'delivered',
    customerName: 'John Doe',
    customerPhone: '08123456789',
    customerAddress: 'Jl. Contoh No. 123, Jakarta',
    items: [
      { name: 'Nasi Goreng Spesial', quantity: 2, price: 25000 },
      { name: 'Es Teh Manis', quantity: 1, price: 5000 }
    ],
    totalAmount: 55000,
    paymentMethod: 'Transfer Bank',
    paymentStatus: 'paid',
    courierName: 'Ahmad Kurniawan',
    courierPhone: '08987654321',
    estimatedDelivery: '2025-01-25 14:00',
    trackingHistory: [
      {
        status: 'Order Placed',
        timestamp: '2025-01-25 10:00',
        description: 'Pesanan berhasil dibuat',
        location: 'Jakarta'
      },
      {
        status: 'Confirmed',
        timestamp: '2025-01-25 10:15',
        description: 'Pesanan dikonfirmasi oleh merchant',
        location: 'Jakarta'
      },
      {
        status: 'Preparing',
        timestamp: '2025-01-25 10:30',
        description: 'Pesanan sedang dipersiapkan',
        location: 'Jakarta'
      },
      {
        status: 'Ready for Pickup',
        timestamp: '2025-01-25 11:00',
        description: 'Pesanan siap diambil kurir',
        location: 'Jakarta'
      },
      {
        status: 'Picked Up',
        timestamp: '2025-01-25 11:15',
        description: 'Pesanan diambil oleh kurir',
        location: 'Jakarta'
      },
      {
        status: 'Delivered',
        timestamp: '2025-01-25 12:30',
        description: 'Pesanan berhasil diantar',
        location: 'Jakarta'
      }
    ]
  }
}

const statusConfig = {
  pending: { label: 'Menunggu', color: 'secondary', icon: Clock },
  confirmed: { label: 'Dikonfirmasi', color: 'default', icon: CheckCircle },
  preparing: { label: 'Dipersiapkan', color: 'default', icon: Package },
  ready: { label: 'Siap Diambil', color: 'default', icon: Package },
  picked_up: { label: 'Dalam Perjalanan', color: 'default', icon: Truck },
  delivered: { label: 'Terkirim', color: 'default', icon: CheckCircle },
  cancelled: { label: 'Dibatalkan', color: 'destructive', icon: Clock }
}

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('')
  const [trackingData, setTrackingData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleTrackOrder = async () => {
    if (!trackingCode.trim()) {
      toast.error('Masukkan kode tracking')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const data = mockTrackingData[trackingCode as keyof typeof mockTrackingData]
      if (data) {
        setTrackingData(data)
        toast.success('Data tracking ditemukan')
      } else {
        setTrackingData(null)
        toast.error('Kode tracking tidak ditemukan')
      }
      setLoading(false)
    }, 1000)
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
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Lacak Pesanan</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Masukkan kode tracking untuk melihat status pesanan Anda secara real-time
          </p>
        </div>

        {/* Tracking Form */}
        <Card>
          <CardHeader>
            <CardTitle>Cari Pesanan</CardTitle>
            <CardDescription>
              Masukkan kode tracking yang diberikan saat pemesanan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="tracking-code">Kode Tracking</Label>
                <Input
                  id="tracking-code"
                  placeholder="Contoh: ORD123"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleTrackOrder} disabled={loading} className="w-full sm:w-auto">
                  <Search className="h-4 w-4 mr-2" />
                  {loading ? 'Mencari...' : 'Lacak Pesanan'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pesanan #{trackingData.orderNumber}</CardTitle>
                  <Badge variant={statusConfig[trackingData.status as keyof typeof statusConfig]?.color as any}>
                    {statusConfig[trackingData.status as keyof typeof statusConfig]?.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Informasi Pelanggan</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Nama:</strong> {trackingData.customerName}</p>
                      <p><strong>Telepon:</strong> {trackingData.customerPhone}</p>
                      <p><strong>Alamat:</strong> {trackingData.customerAddress}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Informasi Kurir</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Nama:</strong> {trackingData.courierName}</p>
                      <p><strong>Telepon:</strong> {trackingData.courierPhone}</p>
                      <p><strong>Estimasi:</strong> {formatDateTime(trackingData.estimatedDelivery)}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Item Pesanan</h4>
                  <div className="space-y-2">
                    {trackingData.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(trackingData.totalAmount)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span><strong>Pembayaran:</strong> {trackingData.paymentMethod}</span>
                  <Badge variant={trackingData.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                    {trackingData.paymentStatus === 'paid' ? 'Lunas' : 'Belum Lunas'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tracking History */}
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Tracking</CardTitle>
                <CardDescription>
                  Timeline perjalanan pesanan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.trackingHistory.map((history: any, index: number) => {
                    const isLast = index === trackingData.trackingHistory.length - 1
                    const StatusIcon = statusConfig[history.status.toLowerCase().replace(/\s+/g, '_') as keyof typeof statusConfig]?.icon || MapPin
                    
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex flex-col items-center">
                          <div className={`p-2 rounded-full ${isLast ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <StatusIcon className="h-4 w-4" />
                          </div>
                          {index < trackingData.trackingHistory.length - 1 && (
                            <div className="w-px h-8 bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{history.status}</h4>
                            <span className="text-sm text-muted-foreground">
                              {formatDateTime(history.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{history.description}</p>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {history.location}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle>Butuh Bantuan?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Jika Anda mengalami masalah dengan pesanan atau tidak dapat menemukan kode tracking, 
              silakan hubungi customer service kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                WhatsApp: +62 822-xxxx-xxxx
              </Button>
              <Button variant="outline">
                Email: support@superapp.com
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}