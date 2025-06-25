// Database Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url?: string
  category_id: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description?: string
  image_url?: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  user_id?: string
  guest_name?: string
  guest_phone?: string
  guest_address?: string
  total_amount: number
  status: OrderStatus
  payment_method: string
  payment_status: PaymentStatus
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}

export interface GuestOrder {
  id: string
  order_number: string
  guest_name: string
  guest_phone: string
  guest_address: string
  total_amount: number
  status: OrderStatus
  payment_method: string
  payment_status: PaymentStatus
  notes?: string
  tracking_code: string
  created_at: string
  updated_at: string
}

export interface CheckoutField {
  id: string
  field_name: string
  field_type: 'text' | 'textarea' | 'select' | 'date' | 'time'
  field_label: string
  field_options?: string[]
  is_required: boolean
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Settings {
  id: string
  key: string
  value: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Banner {
  id: string
  title: string
  image_url: string
  link_url?: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  role: EmployeeRole
  salary_type: 'hourly' | 'monthly'
  salary_amount: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Payroll {
  id: string
  employee_id: string
  period_start: string
  period_end: string
  hours_worked?: number
  orders_completed?: number
  base_salary: number
  bonus: number
  deductions: number
  total_salary: number
  payment_status: 'pending' | 'paid'
  payment_date?: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  template_name: string
  template_type: 'whatsapp' | 'email' | 'sms'
  subject?: string
  message: string
  variables: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface TrackingLog {
  id: string
  order_id: string
  courier_id: string
  latitude: number
  longitude: number
  status: string
  notes?: string
  created_at: string
}

export interface Courier {
  id: string
  name: string
  phone: string
  vehicle_type: string
  is_active: boolean
  current_latitude?: number
  current_longitude?: number
  created_at: string
  updated_at: string
}

export interface Vendor {
  id: string
  name: string
  contact_person: string
  phone: string
  email?: string
  address: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Enums
export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'picked_up'
  | 'delivered'
  | 'cancelled'

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'

export type EmployeeRole = 
  | 'admin'
  | 'manager'
  | 'cashier'
  | 'courier'
  | 'kitchen'

// Form Types
export interface CheckoutFormData {
  name: string
  phone: string
  address: string
  notes?: string
  payment_method: string
  [key: string]: any // For custom fields
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

// Auth Types
export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  address?: string
  role: 'customer' | 'admin'
  created_at: string
  updated_at: string
}