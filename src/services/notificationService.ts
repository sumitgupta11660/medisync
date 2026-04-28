export const notificationService = {
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) return false
    if (Notification.permission === 'granted') return true
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  },

  async send(title: string, options?: NotificationOptions): Promise<void> {
    const granted = await this.requestPermission()
    if (!granted) {
      console.warn('Notification permission denied')
      return
    }

    // If service worker is active, use it (shows even when tab is in background)
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SHOW_NOTIFICATION',
        title,
        options: { icon: '/pwa-192x192.png', badge: '/pwa-192x192.png', ...options },
      })
    } else {
      // Fallback to basic Notification API
      new Notification(title, { icon: '/pwa-192x192.png', ...options })
    }
  },

  sendCriticalAlert(patientName: string, detail: string) {
    return this.send(`⚠ Critical Alert — ${patientName}`, {
      body: detail,
      tag: 'critical-alert',
      requireInteraction: true,
    })
  },

  sendAppointmentReminder(doctorName: string, count: number) {
    return this.send(`📋 Appointment Reminder`, {
      body: `Dr. ${doctorName} has ${count} appointments today`,
      tag: 'appointment',
    })
  },

  sendLabResult(patientName: string) {
    return this.send(`✓ Lab Results Ready`, {
      body: `Results for ${patientName} are available for review`,
      tag: 'lab-result',
    })
  },
}
