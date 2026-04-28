import { useParams, useNavigate } from 'react-router-dom'
import { usePatientStore } from '../store/patientStore'

const statusStyles = {
  Stable: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Critical: 'bg-red-50 text-red-700 border-red-100',
  'Under Review': 'bg-amber-50 text-amber-700 border-amber-100',
}

export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { patients } = usePatientStore()
  const patient = patients.find((p) => p.id === id)

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-semibold text-gray-700">Patient not found</p>
        <button onClick={() => navigate('/patients')} className="mt-4 text-sm text-primary-500 hover:underline">← Back to Patients</button>
      </div>
    )
  }

  const details = [
    { label: 'Patient ID', value: patient.id.toUpperCase() },
    { label: 'Date of Admission', value: new Date(patient.admittedOn).toLocaleDateString('en-IN', { dateStyle: 'long' }) },
    { label: 'Blood Group', value: patient.bloodGroup },
    { label: 'Room / Ward', value: patient.room },
    { label: 'Contact', value: patient.contactNumber },
    { label: 'Attending Doctor', value: patient.doctor },
  ]

  return (
    <div className="animate-slide-up max-w-3xl">
      <button onClick={() => navigate('/patients')} className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
        ← Back to Patients
      </button>

      {/* Header */}
      <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
        <div className="flex items-start gap-5">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-bold ${patient.avatarColor}`}>
            {patient.avatarInitials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
              <span className={`inline-flex items-center rounded-full border px-3 py-0.5 text-sm font-medium ${statusStyles[patient.status]}`}>
                {patient.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Age {patient.age} · {patient.gender} · {patient.department}</p>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="mt-5 rounded-xl bg-primary-50 border border-primary-100 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Primary Diagnosis</p>
          <p className="mt-1 text-sm font-medium text-gray-800">{patient.diagnosis}</p>
        </div>

        {/* Details grid */}
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {details.map((d) => (
            <div key={d.label} className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide">{d.label}</p>
              <p className="mt-1 text-sm font-medium text-gray-800">{d.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline (static demo) */}
      <div className="mt-4 rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { time: 'Today, 09:00 AM', event: 'Morning vitals recorded — All parameters within range', type: 'info' },
            { time: 'Yesterday, 03:30 PM', event: `Lab report reviewed by ${patient.doctor}`, type: 'success' },
            { time: 'Yesterday, 10:00 AM', event: 'Medication adjusted — Dosage update applied', type: 'warning' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
                item.type === 'info' ? 'bg-primary-400' : item.type === 'success' ? 'bg-emerald-400' : 'bg-amber-400'
              }`} />
              <div>
                <p className="text-sm text-gray-800">{item.event}</p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
