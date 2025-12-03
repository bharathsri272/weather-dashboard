# 🌤️ Weather Dashboard
A clean and simple React weather app that lets you search any city and instantly see the current weather + a 5-day forecast.  
Built with **React + Vite**, **OpenWeather API**, and **React Icons**.

---

## 🚀 Live Demo
_Add your Vercel link here once deployed_

---

## ✨ Features
- 🔍 Search any city for real-time weather  
- 🌡️ Temperature, humidity, and wind details  
- 📅 5-day forecast with weather icons  
- ⭐ Saved cities using localStorage  
- 🔁 Auto-update when a new city is searched  
- 🎨 Clean, modern UI with a soft gradient background  

---

## 🛠️ Tech Used
- **React (Vite)**  
- **Axios** for API calls  
- **OpenWeather API**  
- **React Icons**  
- **CSS Grid + Flexbox** for layout  

---

## 📦 Installation

Clone the repo:
```bash
git clone https://github.com/YOUR_USERNAME/weather-dashboard.git
cd weather-dashboard
```

Install dependencies:
```bash
npm install
```

Start the dev server:
```bash
npm run dev
```

---

## 🔑 API Key Setup

1. Create a free OpenWeather account:  
   https://openweathermap.org/api

2. Get your API key

3. Add your key in:
```
src/components/CurrentWeather.jsx
src/components/Forecast.jsx
```

Replace:
```js
const API_KEY = "YOUR_API_KEY_HERE";
```

---

## 📁 Project Structure
```
src/
  components/
    CurrentWeather.jsx
    Forecast.jsx
    SavedCities.jsx
    SearchBar.jsx
  App.jsx
  App.css
  main.jsx
```

---

## 🌐 Deployment (Vercel)
1. Push the project to GitHub  
2. Go to https://vercel.com  
3. Import the repo  
4. Deploy — that's it!  

---

## 🙌 Acknowledgements
- Weather data provided by **OpenWeather**  
- Icons from **React Icons**

---

## 📄 License
Feel free to use or modify this project.
