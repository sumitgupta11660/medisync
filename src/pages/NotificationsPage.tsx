import { useNotifications } from '../hooks/useNotifications'
import type { Notification } from '../types'

const iconMap: Record<Notification['type'], { icon: string; bg: string; text: string }> = {
  alert: { icon: '⚠', bg: 'bg-red-50', text: 'text-red-600' },
  warning: { icon: '⚡', bg: 'bg-amber-50', text: 'text-amber-600' },
  info: { icon: '📋', bg: 'bg-sky-50', text: 'text-sky-600' },
  success: { icon: '✓', bg: 'bg-emerald-50', text: 'text-emerald-600' },
}

function timeAgo(date: Date): string {
  const diff = (Date.now() - new Date(date).getTime()) / 1000
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`
  return `${Math.floor(diff / 86400)} days ago`
}

export function NotificationsPage() {
  const { notifications, unreadCount, markAllRead, markRead, triggerDemo } = useNotifications()

  return (
    <div className="animate-slide-up max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-sm text-gray-500">{unreadCount} unread notifications</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={triggerDemo}
            className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-600"
          >
            Trigger Demo Alert
          </button>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {notifications.map((n) => {
          const style = iconMap[n.type]
          return (
            <div
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`flex gap-4 rounded-2xl border p-4 transition cursor-pointer hover:shadow-sm ${
                n.read ? 'border-gray-100 bg-white' : 'border-primary-100 bg-primary-50/30'
              }`}
            >
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-base ${style.bg} ${style.text}`}>
                {style.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-medium ${n.read ? 'text-gray-700' : 'text-gray-900'}`}>{n.title}</p>
                  {!n.read && <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500" />}
                </div>
                <p className="mt-0.5 text-xs text-gray-500">{n.body}</p>
                <p className="mt-1 text-xs text-gray-400">{timeAgo(n.timestamp)}</p>
              </div>
            </div>
          )
        })}
      </div>

      {notifications.length === 0 && (
        <div className="py-16 text-center text-sm text-gray-400">No notifications yet.</div>
      )}

      <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-xs text-gray-500">
        <strong className="text-gray-700">Service Worker:</strong> Push notifications are enabled via the registered service worker (vite-plugin-pwa). Click "Trigger Demo Alert" to request browser notification permission and see a live notification.
      </div>
    </div>
  )
}
