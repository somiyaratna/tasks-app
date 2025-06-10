# 📋 My Tasks – React Native App
## by Somiya Ratna Behera

A simple, fast, and beautiful task manager built with **React Native (Expo)**. Easily add, edit, prioritize, and delete tasks — with support for local notifications and persistent storage using AsyncStorage.

---

## ✨ Features

- ✅ Add, complete, edit, and delete tasks
- 🔺 Prioritize tasks as **Low**, **Medium**, or **High**
- 🎨 Clean UI using `react-native-dropdown-picker`
- 🔕 Local notifications for reminders (optional)
- 💾 Offline storage using AsyncStorage (tasks persist on app restart)

---

## 🧰 Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [DropDownPicker](https://github.com/hossein-zare/react-native-dropdown-picker)
- [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/somiyaratna/tasks-app.git
cd tasks-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the App

```bash
npx expo start
```
Then scan the QR code with Expo Go (on Android) or Camera App (on iOS) or run on Android/iOS simulator.

### Challenges faced
- Had a bug, where the notification was invoking immediately even after adding a trigger after 10 sec. Took quite some time and docs lookup to fix.
- Implementing the dropdown, because react-native does not have a dropdown component included.
- Adding the ability to change the priority while editing.

All in all, this project was really fun, yet challenging in some aspects to build. Really glad with how it turned out.
