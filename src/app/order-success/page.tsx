'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Package, MessageCircle, Home } from 'lucide-react'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const [orderNumber, setOrderNumber] = useState<string | null>(null)

  useEffect(() => {
    const order = searchParams.get('order')
    setOrderNumber(order)
  }, [searchParams])

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-green-600">Pesanan Berhasil Dibuat!</h1>
          <p className="text-muted-foreground">
            Terima kasih telah berbelanja di SuperApp. Pesanan Anda sedang diproses.
          </p>
          {orderNumber && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Nomor Pesanan</p>
              <p className="text-2xl font-bold">{orderNumber}</p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Langkah Selanjutnya</CardTitle>
            <CardDescription>
              Berikut adalah hal-hal yang perlu Anda ketahui
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-semibold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Konfirmasi Pesanan</h4>
                <p className="text-sm text-muted-foreground">
                  Kami akan menghubungi Anda dalam 15 menit untuk konfirmasi pesanan.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-semibold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Pembayaran</h4>
                <p className="text-sm text-muted-foreground">
                  Lakukan pembayaran sesuai metode yang dipilih. Jika transfer bank, 
                  konfirmasi via WhatsApp setelah transfer.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-semibold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Pengiriman</h4>
                <p className="text-sm text-muted-foreground">
                  Pesanan akan diproses dan dikirim setelah pembayaran dikonfirmasi.
                  Estimasi pengiriman 1-2 jam.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-semibold text-sm">4</span>
              </div>
              <div>
                <h4 className="font-semibold">Tracking</h4>
                <p className="text-sm text-muted-foreground">
                  Gunakan nomor pesanan untuk melacak status pengiriman secara real-time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Butuh Bantuan?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Jika ada pertanyaan tentang pesanan Anda, jangan ragu untuk menghubungi kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp: 0822-xxxx-xxxx
              </Button>
              <Button variant="outline">
                Email: support@superapp.com
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href={`/tracking?kode=${orderNumber}`}>
              <Package className="w-4 h-4 mr-2" />
              Lacak Pesanan
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Tips:</strong> Simpan nomor pesanan Anda untuk memudahkan tracking dan komunikasi dengan customer service.
          </p>
        </div>
      </div>
    </div>
  )
}