import { Alert } from '@/components/ui/modal/notification/Notification';
import axiosInstance from '@/lib/axios';
import { createContext, ReactNode, useContext, useState } from 'react';

interface NotificationContextType {
  alerts: Alert[];
  fetchAlerts: () => Promise<void>;
  addAlert: (alert: Alert) => void;
  markAsRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const fetchAlerts = async () => {
    const res = await axiosInstance.get('/users/me/alerts');
    setAlerts(res.data);
  };

  const addAlert = (alert: Alert) => {
    setAlerts(prev => [alert, ...prev]);
  };

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => (a.id === id ? { ...a, read: true } : a)));
    axiosInstance.put(`/users/me/alerts/${id}`); // 서버에도 반영
  };

  return (
    <NotificationContext.Provider value={{ alerts, fetchAlerts, addAlert, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};
