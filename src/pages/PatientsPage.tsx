import { useNavigate } from 'react-router-dom'
import { usePatientStore } from '../store/patientStore'
import type { Patient } from '../types'

const statusStyles: Record<Patient['status'], string> = {
  Stable: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Critical: 'bg-red-50 text-red-700 border-red-100',
  'Under Review': 'bg-amber-50 text-amber-700 border-amber-100',
}

export function PatientsPage() {
  const navigate = useNavigate()
  const { viewMode, searchQuery, statusFilter, setViewMode, setSearchQuery, setStatusFilter, filteredPatients } = usePatientStore()
  const patients = filteredPatients()

  return (
    <div className="space-y-5 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="mt-1 text-sm text-gray-500">{patients.length} patients found</p>
        </div>
        {/* View toggle */}
        <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
          {(['grid', 'list'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                viewMode === m ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {m === 'grid' ? '⊞ Grid' : '☰ List'}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text" placeholder="Search by name, department, doctor..."
          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-48 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
        <select
          value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary-400"
        >
          <option value="all">All Status</option>
          <option value="Stable">Stable</option>
          <option value="Critical">Critical</option>
          <option value="Under Review">Under Review</option>
        </select>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {patients.map((p) => (
            <button
              key={p.id} onClick={() => navigate(`/patients/${p.id}`)}
              className="rounded-2xl bg-white border border-gray-100 p-5 text-left shadow-sm transition hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-semibold ${p.avatarColor}`}>
                {p.avatarInitials}
              </div>
              <p className="mt-3 font-semibold text-gray-900">{p.name}</p>
              <p className="text-xs text-gray-400">Age {p.age} · {p.gender}</p>
              <p className="mt-1 text-xs text-gray-500">{p.department}</p>
              <div className={`mt-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[p.status]}`}>
                {p.status}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Patient', 'Age', 'Department', 'Doctor', 'Room', 'Status'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {patients.map((p) => (
                <tr
                  key={p.id} onClick={() => navigate(`/patients/${p.id}`)}
                  className="cursor-pointer transition hover:bg-gray-50"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${p.avatarColor}`}>
                        {p.avatarInitials}
                      </div>
                      <span className="font-medium text-gray-900">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{p.age}</td>
                  <td className="px-5 py-3.5 text-gray-500">{p.department}</td>
                  <td className="px-5 py-3.5 text-gray-500">{p.doctor}</td>
                  <td className="px-5 py-3.5 text-gray-500">{p.room}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {patients.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-400">No patients match your filters.</div>
          )}
        </div>
      )}
    </div>
  )
}
