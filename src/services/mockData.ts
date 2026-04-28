import type { Patient } from '../types'

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p001', name: 'Arjun Kapoor', age: 34, gender: 'Male',
    department: 'Cardiology', status: 'Stable', admittedOn: '2024-05-20',
    doctor: 'Dr. Rajesh Verma', contactNumber: '+91-9876543210',
    bloodGroup: 'O+', diagnosis: 'Hypertension Stage II',
    room: '3A-12', avatarInitials: 'AK', avatarColor: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'p002', name: 'Priya Sharma', age: 28, gender: 'Female',
    department: 'Neurology', status: 'Under Review', admittedOn: '2024-06-01',
    doctor: 'Dr. Anita Mehta', contactNumber: '+91-9123456789',
    bloodGroup: 'A+', diagnosis: 'Migraine with Aura',
    room: '2B-07', avatarInitials: 'PS', avatarColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'p003', name: 'Rahul Mehta', age: 52, gender: 'Male',
    department: 'Orthopedics', status: 'Critical', admittedOn: '2024-06-05',
    doctor: 'Dr. Suresh Nair', contactNumber: '+91-9988776655',
    bloodGroup: 'B+', diagnosis: 'Lumbar Disc Herniation L4-L5',
    room: 'ICU-03', avatarInitials: 'RM', avatarColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'p004', name: 'Sunita Kaur', age: 41, gender: 'Female',
    department: 'Oncology', status: 'Stable', admittedOn: '2024-05-15',
    doctor: 'Dr. Pradeep Gupta', contactNumber: '+91-8877665544',
    bloodGroup: 'AB+', diagnosis: 'Stage II Breast Cancer - Post Chemo',
    room: '5C-22', avatarInitials: 'SK', avatarColor: 'bg-pink-100 text-pink-700',
  },
  {
    id: 'p005', name: 'Vikram Rao', age: 67, gender: 'Male',
    department: 'Geriatrics', status: 'Under Review', admittedOn: '2024-06-08',
    doctor: 'Dr. Meena Pillai', contactNumber: '+91-7766554433',
    bloodGroup: 'O-', diagnosis: 'Type 2 Diabetes - Complication Review',
    room: '4A-09', avatarInitials: 'VR', avatarColor: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'p006', name: 'Aarav Nair', age: 19, gender: 'Male',
    department: 'General Medicine', status: 'Stable', admittedOn: '2024-06-10',
    doctor: 'Dr. Kavitha Iyer', contactNumber: '+91-6655443322',
    bloodGroup: 'A-', diagnosis: 'Viral Fever - Dengue Recovery',
    room: '1B-15', avatarInitials: 'AN', avatarColor: 'bg-red-100 text-red-700',
  },
  {
    id: 'p007', name: 'Divya Krishnan', age: 35, gender: 'Female',
    department: 'Pulmonology', status: 'Stable', admittedOn: '2024-06-03',
    doctor: 'Dr. Arvind Sharma', contactNumber: '+91-9543210987',
    bloodGroup: 'B-', diagnosis: 'Moderate Asthma - Exacerbation',
    room: '2A-11', avatarInitials: 'DK', avatarColor: 'bg-teal-100 text-teal-700',
  },
  {
    id: 'p008', name: 'Mohan Das', age: 58, gender: 'Male',
    department: 'Nephrology', status: 'Critical', admittedOn: '2024-06-04',
    doctor: 'Dr. Rajesh Verma', contactNumber: '+91-9012345678',
    bloodGroup: 'AB-', diagnosis: 'Chronic Kidney Disease Stage IV',
    room: 'ICU-07', avatarInitials: 'MD', avatarColor: 'bg-orange-100 text-orange-700',
  },
]

export const ANALYTICS_DATA = {
  admissionsByDay: [
    { day: 'Mon', count: 42 }, { day: 'Tue', count: 38 }, { day: 'Wed', count: 55 },
    { day: 'Thu', count: 49 }, { day: 'Fri', count: 61 }, { day: 'Sat', count: 53 }, { day: 'Sun', count: 47 },
  ],
  caseBreakdown: [
    { name: 'Stable', value: 64, color: '#0ea5e9' },
    { name: 'Under Review', value: 25, color: '#f97316' },
    { name: 'Critical', value: 11, color: '#ef4444' },
  ],
  departmentStats: [
    { department: 'Cardiology', patients: 42, recoveryRate: 96 },
    { department: 'Neurology', patients: 31, recoveryRate: 91 },
    { department: 'Orthopedics', patients: 28, recoveryRate: 88 },
    { department: 'Oncology', patients: 19, recoveryRate: 79 },
    { department: 'General Medicine', patients: 66, recoveryRate: 98 },
  ],
  monthlyTrend: [
    { month: 'Jan', admissions: 210, discharges: 198 }, { month: 'Feb', admissions: 185, discharges: 201 },
    { month: 'Mar', admissions: 230, discharges: 215 }, { month: 'Apr', admissions: 248, discharges: 232 },
    { month: 'May', admissions: 265, discharges: 259 }, { month: 'Jun', admissions: 188, discharges: 172 },
  ],
}
