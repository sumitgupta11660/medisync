export interface Patient {
  id: string
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  department: string
  status: 'Stable' | 'Critical' | 'Under Review'
  admittedOn: string
  doctor: string
  contactNumber: string
  bloodGroup: string
  diagnosis: string
  room: string
  avatarInitials: string
  avatarColor: string
}

export interface AnalyticsData {
  admissionsByDay: { day: string; count: number }[]
  caseBreakdown: { name: string; value: number; color: string }[]
  departmentStats: { department: string; patients: number; recoveryRate: number }[]
  monthlyTrend: { month: string; admissions: number; discharges: number }[]
}

export interface Notification {
  id: string
  type: 'alert' | 'info' | 'success' | 'warning'
  title: string
  body: string
  timestamp: Date
  read: boolean
  patientId?: string
}

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
}

export type ViewMode = 'grid' | 'list'
