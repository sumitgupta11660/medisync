import { create } from 'zustand'
import type { Patient, Notification, ViewMode } from '../types'
import { MOCK_PATIENTS } from '../services/mockData'

interface PatientState {
  patients: Patient[]
  selectedPatient: Patient | null
  viewMode: ViewMode
  searchQuery: string
  statusFilter: string
  setSelectedPatient: (p: Patient | null) => void
  setViewMode: (m: ViewMode) => void
  setSearchQuery: (q: string) => void
  setStatusFilter: (s: string) => void
  filteredPatients: () => Patient[]
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: MOCK_PATIENTS,
  selectedPatient: null,
  viewMode: 'grid',
  searchQuery: '',
  statusFilter: 'all',
  setSelectedPatient: (p) => set({ selectedPatient: p }),
  setViewMode: (m) => set({ viewMode: m }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setStatusFilter: (s) => set({ statusFilter: s }),
  filteredPatients: () => {
    const { patients, searchQuery, statusFilter } = get()
    return patients.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.doctor.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter
      return matchesSearch && matchesStatus
    })
  },
}))

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  addNotification: (n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAllRead: () => void
  markRead: (id: string) => void
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [
    {
      id: 'n1', type: 'alert', title: 'Critical Alert — Rahul Mehta',
      body: 'Blood pressure exceeded threshold. Immediate attention required.',
      timestamp: new Date(Date.now() - 2 * 60000), read: false, patientId: 'p003',
    },
    {
      id: 'n2', type: 'info', title: 'Appointment Reminder',
      body: 'Dr. Anita Mehta has 4 appointments starting 10:00 AM.',
      timestamp: new Date(Date.now() - 15 * 60000), read: false,
    },
    {
      id: 'n3', type: 'success', title: 'Lab Results Available',
      body: 'CBC report for Priya Sharma is ready for review.',
      timestamp: new Date(Date.now() - 60 * 60000), read: true, patientId: 'p002',
    },
  ],
  unreadCount: 2,
  addNotification: (n) => {
    const newN: Notification = { ...n, id: `n${Date.now()}`, timestamp: new Date(), read: false }
    set((s) => ({ notifications: [newN, ...s.notifications], unreadCount: s.unreadCount + 1 }))
  },
  markAllRead: () => set((s) => ({ notifications: s.notifications.map(n => ({ ...n, read: true })), unreadCount: 0 })),
  markRead: (id) => {
    const { notifications } = get()
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n)
    set({ notifications: updated, unreadCount: updated.filter(n => !n.read).length })
  },
}))
