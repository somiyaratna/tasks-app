import * as Notifications from "expo-notifications";

// Ask for permission (only needed once per install)
export const requestNotificationPermission = async () => {
  const { granted } = await Notifications.requestPermissionsAsync();
  return granted;
};

// Schedule a local notification
export const scheduleNotification = async (task, notificationId) => {
  const notif = await Notifications.scheduleNotificationAsync({
    content: {
      title: `${task.title} (${task.priority})`,
      body: `Time to complete ${task.title}`,
      data: { task },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 10,
    },
    identifier: notificationId,
  });
  return notif;
};

// Cancel a local notification
export const cancelNotification = (notificationId) => {
  Notifications.cancelScheduledNotificationAsync(notificationId);
};
