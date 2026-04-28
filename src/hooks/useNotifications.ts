import { useEffect } from 'react'
import { useNotificationStore } from '../store/patientStore'
import { notificationService } from '../services/notificationService'

export function useNotifications() {
  const { notifications, unreadCount, addNotification, markAllRead, markRead } = useNotificationStore()

  useEffect(() => {
    // Simulate a critical alert after 30 seconds (demo purposes)
    const timer = setTimeout(() => {
      addNotification({
        type: 'alert',
        title: 'Critical Alert — Mohan Das',
        body: 'Kidney function markers deteriorating. Immediate review required.',
        patientId: 'p008',
      })
      notificationService.sendCriticalAlert('Mohan Das', 'Kidney function markers deteriorating.')
    }, 30000)
    return () => clearTimeout(timer)
  }, [addNotification])

  const triggerDemo = async () => {
    await notificationService.sendCriticalAlert('Arjun Kapoor', 'Heart rate anomaly detected in Ward 3A.')
    addNotification({
      type: 'alert',
      title: 'Demo Alert — Arjun Kapoor',
      body: 'Heart rate anomaly detected in Ward 3A.',
      patientId: 'p001',
    })
  }

  return { notifications, unreadCount, markAllRead, markRead, triggerDemo }
}
