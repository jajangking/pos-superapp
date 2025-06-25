import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Truck, Shield, Clock, Sparkles, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 animate-gradient"></div>
        <div className="relative container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 hover-lift">
                <Sparkles className="mr-2 h-4 w-4" />
                Platform Pemesanan Terdepan
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              Pesan Online dengan
              <span className="block mt-2">SuperApp</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Platform pemesanan online terpercaya dengan berbagai pilihan produk berkualitas. 
              Pesan sekarang dan nikmati kemudahan berbelanja dari rumah dengan teknologi terdepan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 btn-gradient hover-lift" asChild>
                <Link href="/menu">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Lihat Menu Sekarang
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover-lift border-2 border-primary/20 hover:border-primary/40" asChild>
                <Link href="/tracking">
                  <Search className="mr-2 h-5 w-5" />
                  Lacak Pesanan
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mengapa Pilih SuperApp?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Kami menyediakan layanan terbaik untuk memenuhi kebutuhan belanja online Anda dengan teknologi modern
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="card-modern hover-lift group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Produk Berkualitas</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base leading-relaxed">
                Berbagai pilihan produk berkualitas tinggi dengan harga terjangkau dari vendor terpercaya
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-modern hover-lift group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Pengiriman Cepat</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base leading-relaxed">
                Pengiriman cepat dan aman ke seluruh Indonesia dengan tracking real-time dan kurir profesional
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-modern hover-lift group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Pembayaran Aman</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base leading-relaxed">
                Berbagai metode pembayaran yang aman dan terpercaya dengan enkripsi tingkat bank
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-modern hover-lift group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Layanan 24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base leading-relaxed">
                Customer service profesional siap membantu Anda kapan saja dengan respon cepat
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 animate-gradient"></div>
        <div className="relative container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Mulai Berbelanja Sekarang
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Bergabunglah dengan ribuan pelanggan yang sudah merasakan kemudahan berbelanja di SuperApp. 
              Dapatkan pengalaman belanja online terbaik dengan teknologi terdepan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 btn-gradient hover-lift" asChild>
                <Link href="/auth/signup">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Daftar Sekarang
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover-lift border-2 border-primary/20 hover:border-primary/40" asChild>
                <Link href="/menu">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Belanja Tanpa Daftar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-3 hover-lift p-6 rounded-xl card-modern">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              10K+
            </div>
            <div className="text-base font-medium text-muted-foreground">Pelanggan Puas</div>
          </div>
          <div className="text-center space-y-3 hover-lift p-6 rounded-xl card-modern">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              500+
            </div>
            <div className="text-base font-medium text-muted-foreground">Produk Tersedia</div>
          </div>
          <div className="text-center space-y-3 hover-lift p-6 rounded-xl card-modern">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              50+
            </div>
            <div className="text-base font-medium text-muted-foreground">Kota Terjangkau</div>
          </div>
          <div className="text-center space-y-3 hover-lift p-6 rounded-xl card-modern">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              99%
            </div>
            <div className="text-base font-medium text-muted-foreground">Tingkat Kepuasan</div>
          </div>
        </div>
      </section>
    </div>
  );
}
