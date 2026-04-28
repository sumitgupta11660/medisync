import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend
} from 'recharts'
import { ANALYTICS_DATA } from '../services/mockData'

export function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">Facility performance and patient statistics overview.</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Avg Length of Stay', value: '4.2 days', sub: '↓ 0.3 vs last month' },
          { label: 'Bed Occupancy', value: '78%', sub: '↑ 3% vs last month' },
          { label: 'Patient Satisfaction', value: '4.6/5', sub: '↑ 0.2 vs last month' },
          { label: 'Readmission Rate', value: '6.1%', sub: '↓ 1.2% vs last month' },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{k.label}</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{k.value}</p>
            <p className="mt-1 text-xs text-gray-400">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Monthly trend */}
      <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Monthly Admissions vs Discharges</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={ANALYTICS_DATA.monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="admissions" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 4 }} name="Admissions" />
            <Line type="monotone" dataKey="discharges" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} name="Discharges" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Department stats */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Patients by Department</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ANALYTICS_DATA.departmentStats} layout="vertical" barSize={16}>
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="department" type="category" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} width={110} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="patients" fill="#0ea5e9" radius={[0, 6, 6, 0]} name="Patients" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Recovery Rate by Department</h2>
          <div className="space-y-3">
            {ANALYTICS_DATA.departmentStats.map((d) => (
              <div key={d.department}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{d.department}</span>
                  <span className="font-medium">{d.recoveryRate}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-primary-500 transition-all duration-700"
                    style={{ width: `${d.recoveryRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
