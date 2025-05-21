export interface Option {
  label: string
  onClick: () => void
}

export interface Message {
  message: string
  sender: 'user' | 'bot'
  timestamp: string
  options?: Option[]
  loading?: boolean
}

export interface TQuickMessage {
  title: string
  message: string
  disabled?: boolean
  onClick?: () => void
}

export interface OrderItem {
  name: string
  quantity: number
  price: number
  observation?: string
}

export interface Order {
  id: number
  name: string
  status: 'pending' | 'canceled' | 'completed'
  total: number
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}
