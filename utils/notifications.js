import * as Notifications from "expo-notifications";

// Ask for permission (only needed once per install)
export const requestNotificationPermission = async () => {
  const settings = await Notifications.getPermissionsAsync();
  if (!settings.granted) {
    const result = await Notifications.requestPermissionsAsync();
    return result.granted;
  }
  return true;
};

// Schedule a local notification
export const scheduleNotification = async (taskTitle, taskId) => {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "Task Reminder",
      body: `Time to complete: ${taskTitle}`,
      data: { taskId },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 10,
    },
  });
};

export const cancelNotification = async (notificationId) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.log("Failed to cancel notification:", error);
  }
};
