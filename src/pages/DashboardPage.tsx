import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useAuthStore } from '../store/authStore'
import { ANALYTICS_DATA, MOCK_PATIENTS } from '../services/mockData'

const statCards = [
  { label: 'Total Patients', value: '2,847', change: '+12%', changeLabel: 'this month', positive: true },
  { label: 'Active Cases', value: '186', change: '−3', changeLabel: 'critical today', positive: false },
  { label: 'Recovery Rate', value: '94%', change: '+2.1%', changeLabel: 'vs last month', positive: true },
  { label: "Today's Appointments", value: '43', change: '8', changeLabel: 'remaining', positive: true },
]

const criticalPatients = MOCK_PATIENTS.filter((p) => p.status === 'Critical')

export function DashboardPage() {
  const { user } = useAuthStore()
  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{greeting()}, {user?.displayName ?? user?.email?.split('@')[0]} 👋</h1>
        <p className="mt-1 text-sm text-gray-500">Here's what's happening at your facility today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{s.label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{s.value}</p>
            <p className={`mt-1 text-xs ${s.positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {s.change} {s.changeLabel}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Weekly admissions */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Weekly Admissions</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={ANALYTICS_DATA.admissionsByDay} barSize={32}>
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Bar dataKey="count" fill="#0ea5e9" radius={[6, 6, 0, 0]} name="Admissions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Case breakdown */}
        <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Case Breakdown</h2>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={ANALYTICS_DATA.caseBreakdown} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3}>
                {ANALYTICS_DATA.caseBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {ANALYTICS_DATA.caseBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs text-gray-500">
                <div className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                <span className="flex-1">{item.name}</span>
                <span className="font-medium text-gray-700">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical patients */}
      {criticalPatients.length > 0 && (
        <div className="rounded-2xl bg-red-50 border border-red-100 p-5">
          <h2 className="mb-3 text-sm font-semibold text-red-700">⚠ Critical Patients — Immediate Attention</h2>
          <div className="space-y-2">
            {criticalPatients.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${p.avatarColor}`}>
                  {p.avatarInitials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.department} · {p.room} · {p.doctor}</p>
                </div>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">Critical</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}