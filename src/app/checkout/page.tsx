'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { CheckoutFormData } from '@/types'
import { CreditCard, Truck, MapPin } from 'lucide-react'
import { toast } from 'sonner'

const paymentMethods = [
  { id: 'transfer', name: 'Transfer Bank', description: 'BCA, Mandiri, BNI, BRI' },
  { id: 'cod', name: 'Bayar di Tempat (COD)', description: 'Bayar saat barang diterima' },
  { id: 'ewallet', name: 'E-Wallet', description: 'GoPay, OVO, DANA, ShopeePay' }
]

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: user?.user_metadata?.name || '',
    phone: user?.user_metadata?.phone || '',
    address: '',
    notes: '',
    payment_method: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.payment_method) {
      toast.error('Harap isi semua field yang wajib')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    
    try {
      // Simulate order creation
      const orderNumber = 'ORD' + Date.now().toString().slice(-6)
      
      // Here you would normally send data to your backend
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      clearCart()
      toast.success('Pesanan berhasil dibuat!')
      router.push(`/order-success?order=${orderNumber}`)
    } catch (error) {
      toast.error('Terjadi kesalahan, silakan coba lagi')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (cart.items.length === 0) {
    router.push('/cart')
    return null
  }

  const shippingCost = 10000 // Fixed shipping cost for demo
  const totalWithShipping = cart.total + shippingCost

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Informasi Pengiriman
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat Lengkap *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Masukkan alamat lengkap termasuk kode pos"
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan (Opsional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Catatan tambahan untuk pesanan"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Metode Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={formData.payment_method} onValueChange={(value) => handleInputChange('payment_method', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih metode pembayaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-muted-foreground">{method.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} x {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <span className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Costs */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      Ongkos Kirim
                    </span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(totalWithShipping)}</span>
                </div>

                <Button 
                  onClick={handleSubmit} 
                  className="w-full" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Memproses...' : 'Buat Pesanan'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
                </p>
              </CardContent>
            </Card>

            {/* Payment Info */}
            {formData.payment_method === 'transfer' && (
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Transfer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <p><strong>Bank:</strong> BCA</p>
                    <p><strong>No. Rekening:</strong> 1234567890</p>
                    <p><strong>Atas Nama:</strong> SuperApp Indonesia</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Setelah transfer, konfirmasi pembayaran via WhatsApp ke 0822-xxxx-xxxx
                  </p>
                </CardContent>
              </Card>
            )}

            {formData.payment_method === 'cod' && (
              <Card>
                <CardHeader>
                  <CardTitle>Bayar di Tempat (COD)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Pembayaran dilakukan saat barang diterima. Pastikan menyiapkan uang pas.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}