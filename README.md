# WeatherNow

WeatherNow is a comprehensive weather application providing current weather conditions, air quality index, hourly and weekly forecasts, and weather alerts. The app also includes features like location detection, search suggestions, and customizable dashboards. Additionally, it supports interactive maps and historical weather data. 

## Features

1. **Current Weather Data**: 
   - Fetch current weather data using OpenWeatherMap API.
   - Display temperature, feels like temperature, weather description, humidity, pressure, wind speed, wind direction, cloudiness, visibility, sunrise, and sunset times.
   - Display appropriate weather icons based on conditions.

2. **Air Quality Data**: 
   - Fetch air quality data using AQICN API.
   - Display AQI value and description with color coding based on levels of concern.

3. **Location Detection**:
   - Automatically detect user's location and fetch weather data.

4. **Forecast**:
   - Display hourly forecast for the next 24 hours.
   - Display 7-day forecast with summary icons and temperatures.

5. **Weather Alerts**:
   - Display alerts for severe weather conditions like storms, heatwaves, or cold fronts.

6. **Historical Data**:
   - Allow users to view historical weather data for the past week or month.

7. **User Preferences**:
   - Save user preferences (like selected city, units of measurement) using local storage.

8. **Interactive Map**:
   - Integrate a map showing current weather conditions for different regions.

9. **Accessibility**:
   - Ensure the app is fully accessible, including screen reader support and keyboard navigation.

10. **Performance Improvements**:
    - Implement lazy loading for images and other resources to improve initial load time.
    - Use code splitting to load only the necessary JavaScript for the current page.
    - Implement a service worker for offline access and to cache frequently accessed data.

11. **Enhanced Location Detection**:
    - Provide an option for users to refine their detected location manually if the geolocation API is inaccurate.

12. **Improved UI/UX**:
    - Add smooth transitions and animations for page loads and element interactions.
    - Enhance the design with better typography and spacing.

13. **Search Suggestions**:
    - Implement an auto-suggest feature in the city search input to help users find cities more easily.

14. **Customizable Dashboard**:
    - Allow users to customize their dashboard with widgets for different types of information (e.g., humidity, wind speed, air quality).

15. **Security**:
    - Use a proxy server to handle API requests securely without exposing the API key to the client.

16. **News Videos/Articles**:
    - Add top stories/news slider.
    - Option to close player.
    - Space for ads (optional).

17. **Admin Stats**:
    - Dashboard for viewing platform stats (views, time spent).

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/lingamvamshikrishnareddy/weather-now.git
   cd weather-now
