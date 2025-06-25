import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Truck, Shield, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Pesan Online dengan <span className="text-primary">SuperApp</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Platform pemesanan online terpercaya dengan berbagai pilihan produk berkualitas. 
              Pesan sekarang dan nikmati kemudahan berbelanja dari rumah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/menu">Lihat Menu</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tracking">Lacak Pesanan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Mengapa Pilih SuperApp?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kami menyediakan layanan terbaik untuk memenuhi kebutuhan belanja online Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="text-center">
              <ShoppingBag className="h-12 w-12 mx-auto text-primary" />
              <CardTitle>Produk Berkualitas</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Berbagai pilihan produk berkualitas tinggi dengan harga terjangkau
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Truck className="h-12 w-12 mx-auto text-primary" />
              <CardTitle>Pengiriman Cepat</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Pengiriman cepat dan aman ke seluruh Indonesia dengan tracking real-time
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 mx-auto text-primary" />
              <CardTitle>Pembayaran Aman</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Berbagai metode pembayaran yang aman dan terpercaya
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Clock className="h-12 w-12 mx-auto text-primary" />
              <CardTitle>Layanan 24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Customer service siap membantu Anda kapan saja
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Mulai Berbelanja Sekarang</h2>
            <p className="text-muted-foreground">
              Bergabunglah dengan ribuan pelanggan yang sudah merasakan kemudahan berbelanja di SuperApp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/signup">Daftar Sekarang</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/menu">Belanja Tanpa Daftar</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground">Pelanggan Puas</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Produk Tersedia</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Kota Terjangkau</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">99%</div>
            <div className="text-sm text-muted-foreground">Tingkat Kepuasan</div>
          </div>
        </div>
      </section>
    </div>
  );
}
