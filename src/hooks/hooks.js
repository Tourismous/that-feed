import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth'
import * as api from '../services/api';

// Hook for managing user subscriptions
export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken, isAuthenticated } = useAuth();

  const fetchSubscriptions = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const token = getToken();
      const data = await api.getUserSubscriptions(token);
      setSubscriptions(data);
      setError(null);
    } catch (err) {
      console.error("Subscription fetch error:", err);
      setError("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, getToken]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const subscribe = async (categoryId) => {
    try {
      const token = getToken();
      await api.subscribeToCategory(token, categoryId);
      // Refresh subscriptions after successful subscription
      fetchSubscriptions();
      return true;
    } catch (err) {
      console.error("Subscribe error:", err);
      setError("Failed to subscribe");
      return false;
    }
  };

  const unsubscribe = async (categoryId) => {
    try {
      const token = getToken();
      await api.unsubscribeFromCategory(token, categoryId);
      // Refresh subscriptions after successful unsubscription
      fetchSubscriptions();
      return true;
    } catch (err) {
      console.error("Unsubscribe error:", err);
      setError("Failed to unsubscribe");
      return false;
    }
  };

  return {
    subscriptions,
    loading,
    error,
    subscribe,
    unsubscribe,
    refreshSubscriptions: fetchSubscriptions
  };
};

// Hook for fetching news by category
export const useNews = (categoryId = null) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  const fetchNews = useCallback(async () => {
    if (!categoryId) return;

    setLoading(true);
    try {
      const token = getToken();
      const data = await api.getNewsByCategory(categoryId, token);
      setNews(data);
      setError(null);
    } catch (err) {
      console.error("News fetch error:", err);
      setError("Failed to load news");
    } finally {
      setLoading(false);
    }
  }, [categoryId, getToken]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const refreshNews = async () => {
    try {
      const token = getToken();
      await api.fetchNews(token);
      // After triggering a news fetch, get the updated news
      fetchNews();
      return true;
    } catch (err) {
      console.error("News refresh error:", err);
      setError("Failed to refresh news");
      return false;
    }
  };

  return { news, loading, error, refreshNews };
};

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken, isAuthenticated } = useAuth();

  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const token = getToken();
      const data = await api.getNotifications(token);
      setNotifications(data);
      setError(null);
    } catch (err) {
      console.error("Notifications fetch error:", err);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, getToken]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (notificationId) => {
    try {
      const token = getToken();
      await api.markNotificationAsRead(token, notificationId);

      // Update local state to mark notification as read
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId
            ? { ...notif, is_read: true }
            : notif
        )
      );

      return true;
    } catch (err) {
      console.error("Mark notification error:", err);
      setError("Failed to mark notification as read");
      return false;
    }
  };

  return {
    notifications,
    loading,
    error,
    markAsRead,
    refreshNotifications: fetchNotifications,
    unreadCount: notifications.filter(n => !n.is_read).length
  };
};
