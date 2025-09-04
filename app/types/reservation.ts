export interface Reservation {
  id: string
  line_user_id: string
  display_name: string
  menu: string
  reserved_at: string
  note?: string
  created_at: string
}

export interface CreateReservationRequest {
  line_user_id: string
  display_name: string
  menu: string
  reserved_at: string
  note?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}