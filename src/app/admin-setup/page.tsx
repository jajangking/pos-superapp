'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  Shield, 
  User, 
  Mail, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Crown,
  Sparkles
} from 'lucide-react'

export default function AdminSetup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')
  
  const { signUp, signIn, user, isAdmin } = useAuth()
  const router = useRouter()

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // Pastikan email mengandung 'admin'
      if (!email.toLowerCase().includes('admin')) {
        setMessage('Email harus mengandung kata "admin" untuk akses admin')
        setMessageType('error')
        setLoading(false)
        return
      }

      if (password.length < 6) {
        setMessage('Password minimal 6 karakter')
        setMessageType('error')
        setLoading(false)
        return
      }

      // Coba daftar dulu
      const signUpResult = await signUp(email, password, {
        full_name: 'Admin SuperApp',
        role: 'admin'
      })

      if (signUpResult.error) {
        // Jika gagal daftar (mungkin sudah ada), coba login
        const signInResult = await signIn(email, password)
        
        if (signInResult.error) {
          setMessage(`Error: ${signInResult.error}`)
          setMessageType('error')
        } else {
          setMessage('Login berhasil! Redirecting ke admin panel...')
          setMessageType('success')
          setTimeout(() => {
            router.push('/admin')
          }, 2000)
        }
      } else {
        setMessage('Akun admin berhasil dibuat! Silakan cek email untuk verifikasi, lalu login.')
        setMessageType('success')
      }
    } catch (error) {
      setMessage('Terjadi kesalahan. Silakan coba lagi.')
      setMessageType('error')
    }

    setLoading(false)
  }

  const quickLogin = async (demoEmail: string, demoPassword: string) => {
    setLoading(true)
    const result = await signIn(demoEmail, demoPassword)
    
    if (result.error) {
      setMessage(`Error: ${result.error}`)
      setMessageType('error')
    } else {
      setMessage('Login berhasil! Redirecting...')
      setMessageType('success')
      setTimeout(() => {
        router.push('/admin')
      }, 1500)
    }
    setLoading(false)
  }

  if (user && isAdmin) {
    return (
      <div className="container max-w-2xl mx-auto py-12">
        <Card className="card-modern">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Selamat Datang, Admin!
            </CardTitle>
            <CardDescription>
              Anda sudah login sebagai admin. Akses panel admin sekarang.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Badge variant="secondary" className="px-4 py-2">
              <CheckCircle className="mr-2 h-4 w-4" />
              Status: Admin Aktif
            </Badge>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-gradient hover-lift" 
                onClick={() => router.push('/admin')}
              >
                <Shield className="mr-2 h-4 w-4" />
                Buka Admin Panel
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/')}
                className="hover-lift"
              >
                Kembali ke Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="mr-2 h-4 w-4" />
          Admin Setup SuperApp
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Setup Akun Admin
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Buat akun admin untuk mengakses panel administrasi SuperApp
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Create Admin */}
        <Card className="card-modern hover-lift">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Buat Akun Admin Baru</CardTitle>
            <CardDescription>
              Daftar dengan email yang mengandung kata "admin"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Admin</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@superapp.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  * Email harus mengandung kata "admin"
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {message && (
                <Alert className={messageType === 'error' ? 'border-destructive' : 'border-green-500'}>
                  {messageType === 'error' ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full btn-gradient hover-lift" 
                disabled={loading}
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Buat Akun Admin
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Demo */}
        <Card className="card-modern hover-lift">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg gradient-secondary flex items-center justify-center mb-4">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Demo Admin</CardTitle>
            <CardDescription>
              Login cepat dengan akun demo untuk testing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono">admin@superapp.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono">admin123</span>
              </div>
            </div>

            <Button 
              onClick={() => quickLogin('admin@superapp.com', 'admin123')}
              className="w-full gradient-secondary text-white hover-lift"
              disabled={loading}
            >
              {loading ? (
                'Login...'
              ) : (
                <>
                  Login Demo Admin
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="text-xs text-muted-foreground text-center">
              * Akun demo akan dibuat otomatis jika belum ada
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Petunjuk Akses Admin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-sm font-bold">
                1
              </div>
              <h4 className="font-medium">Buat/Login Admin</h4>
              <p className="text-sm text-muted-foreground">
                Gunakan email dengan kata "admin"
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-sm font-bold">
                2
              </div>
              <h4 className="font-medium">Verifikasi Email</h4>
              <p className="text-sm text-muted-foreground">
                Cek email untuk link verifikasi
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-sm font-bold">
                3
              </div>
              <h4 className="font-medium">Akses Admin Panel</h4>
              <p className="text-sm text-muted-foreground">
                Menu "Admin" akan muncul di header
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}