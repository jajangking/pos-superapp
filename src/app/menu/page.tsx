'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCart } from '@/contexts/CartContext'
import { Product, Category } from '@/types'
import { Plus, Search, Filter } from 'lucide-react'
import { toast } from 'sonner'

// Mock data - nanti akan diganti dengan data dari Supabase
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Makanan',
    description: 'Berbagai pilihan makanan lezat',
    sort_order: 1,
    is_active: true,
    created_at: '2025-01-01',
    updated_at: '2025-01-01'
  },
  {
    id: '2',
    name: 'Minuman',
    description: 'Minuman segar dan sehat',
    sort_order: 2,
    is_active: true,
    created_at: '2025-01-01',
    updated_at: '2025-01-01'
  },
  {
    id: '3',
    name: 'Snack',
    description: 'Camilan untuk segala suasana',
    sort_order: 3,
    is_active: true,
    created_at: '2025-01-01',
    updated_at: '2025-01-01'
  }
]

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan telur, ayam, dan sayuran segar',
    price: 25000,
    image_url: '/placeholder-food.jpg',
    category_id: '1',
    is_active: true,
    created_at: '2025-01-01',
    updated_at: '2025-01-01'
  },
  {
    id: '2',
    name: 'Mie Ayam Bakso',
    description: 'Mie ayam dengan bakso sapi dan pangsit goreng',
    price: 20000,
    image_url: '/placeholder-food.jpg',
    category_id: '1',
    is_active: true,
    created_at: '2025-01-01',
    updated_at: '2025-01-01'
  },
  {
    id: '3',
    name: 'Es Teh Manis',
    description: 'Teh manis dingin yang menyegarkan',
    price: 5000,
    image_url: '/placeholder-drink.jpg',
    category_id: '2',
    is_active: true,
    created_at: '2025-01-01',
    updated_at: '2025-01-01'
  },
  {
    id: '4',
    name: 'Jus Jeruk',
    description: 'Jus jeruk segar tanpa gula tambahan',
    price: 12000,
    image_url: '/placeholder-drink.jpg',
    category_id: '2',
    is_active: true,
    created_at: '2025-01-01',
    updated_at: '2025-01-01'
  },
  {
    id: '5',
    name: 'Keripik Singkong',
    description: 'Keripik singkong renyah dengan berbagai rasa',
    price: 8000,
    image_url: '/placeholder-snack.jpg',
    category_id: '3',
    is_active: true,
    created_at: '2025-01-01',
    updated_at: '2025-01-01'
  }
]

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<string>('name')
  const { addItem } = useCart()

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch && product.is_active
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast.success(`${product.name} ditambahkan ke keranjang`)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Menu Kami</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pilih dari berbagai menu lezat yang tersedia. Semua dibuat dengan bahan-bahan berkualitas tinggi.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nama A-Z</SelectItem>
              <SelectItem value="price-low">Harga Terendah</SelectItem>
              <SelectItem value="price-high">Harga Tertinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            size="sm"
          >
            Semua
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              size="sm"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative bg-muted">
                  <Image
                    src={product.image_url || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder.jpg'
                    }}
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                    <Badge variant="secondary" className="ml-2">
                      {categories.find(c => c.id === product.category_id)?.name}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <Button onClick={() => handleAddToCart(product)} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tidak ada produk yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  )
}