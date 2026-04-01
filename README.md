# 🚨 Smart Crisis & Safety Dashboard

## 📌 Project Overview

The **Smart Crisis & Safety Dashboard** is a web-based application that provides real-time information about weather conditions, earthquake alerts, and disaster-related news.

This project demonstrates the use of **JavaScript, API integration, and modern UI design** to build a practical and interactive application that helps users stay informed about potential risks.

---

## 🎯 Objectives

* Integrate real-time data using public APIs
* Implement search, filtering, and sorting using JavaScript HOFs
* Build a responsive and visually appealing UI
* Handle asynchronous operations and errors efficiently

---

## 🚀 Features

### 🌦 Weather Information

* Search weather by city name
* Displays:

  * Temperature
  * Weather condition
  * Humidity
  * Wind speed

---

### 🌍 Earthquake Alerts

* Fetches real-time earthquake data
* Displays:

  * Magnitude
  * Location
  * Time of occurrence

---

### 📰 Disaster News

* Fetches disaster-related news articles
* Displays:

  * Title
  * Description

---

### 🔍 Search Functionality

* Search across earthquake locations and news
* Implemented using JavaScript **`.filter()`**

---

### 🎯 Filtering Options

* Filter data by:

  * All
  * Weather
  * Earthquake
  * News

---

### ❤️ Favorites (Local Storage)

* Save important alerts
* Data persists even after page reload

---

### 🌙 Dark Mode

* Toggle between light and dark themes for better UX

---

### ⚡ Debouncing (Performance Optimization)

* Prevents excessive filtering operations during typing

---

## 🛠️ Technologies Used

* **HTML5**
* **CSS3 (Glassmorphism UI)**
* **JavaScript (ES6)**
* **Fetch API**

---

## 📡 APIs Used

### 🌦 OpenWeather API

* Provides real-time weather data

### 🌍 USGS Earthquake API

* Provides global earthquake data

### 📰 News API

* Provides disaster-related news

---

## 🔄 Application Flow

1. User enters a city name
2. Weather data is fetched using OpenWeather API
3. Earthquake data is fetched from USGS API
4. News data is fetched from News API
5. All data is combined and processed
6. UI dynamically updates with cards
7. User can:

   * Search
   * Filter
   * Save favorites

---

## 📊 Flowchart

```
          ┌───────────────┐
          │   User Input   │
          │  (City Name)   │
          └──────┬────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Fetch Weather API │
        └──────────────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Fetch Earthquake  │
        │      Data         │
        └──────────────────┘
                 │
                 ▼
        ┌──────────────────┐
        │   Fetch News API  │
        └──────────────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Combine All Data  │
        └──────────────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Render UI (Cards) │
        └──────────────────┘
                 │
     ┌───────────┼────────────┐
     ▼           ▼            ▼
 Search      Filter       Save Data
(HOF)        (HOF)       (LocalStorage)
```

---


## 🔑 API Configuration

Update your API keys in `script.js`:

```js
const WEATHER_API_KEY = "e8b67a087834ac4643e405d8c13670fe";
const NEWS_API_KEY = "searching";
```

---

## 📱 Responsiveness

* Fully responsive design
* Works on:

  * Desktop
  * Tablet
  * Mobile devices

---

## ⭐ Bonus Features Implemented

* Debouncing
* Local Storage
* Glassmorphism UI
* Smooth animations
* Error handling

---

## ⚠️ Challenges Faced

* Handling API errors and invalid responses
* Managing asynchronous operations
* Designing responsive layouts
* Integrating multiple APIs

---

## 🚀 Future Improvements

* Add 5-day weather forecast
* Add location-based detection
* Add notifications for alerts
* Improve UI animations

---

Demo link - https://yashsengar455.github.io/Smart-Crisis-Safety-Dashboard/

## 👨‍💻 Author

yash sengar

---

This project is created for educational purposes.
