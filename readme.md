# Express.js Weather Forecast Application

This project is a Node.js application built with the Express.js framework, utilizing TypeScript and Bun as the package manager. It serves as a weather forecast application that provides current weather information based on the user's IP address or a specified country.

## Core Functionality:

- **Geolocation**: Automatically detects the user's country based on their IP address using `geoip-lite`.
- **Weather Data Retrieval**: Fetches weather forecast data from the WeatherAPI for the detected or specified country.
- **Dynamic Content Rendering**: Uses Handlebars (HBS) as the templating engine to dynamically display weather information on the web page.
- **API Integration**: Integrates with an external weather API (WeatherAPI) via `axios` to retrieve forecast details.

## Technical Details:

- **Framework**: Express.js
- **Language**: TypeScript
- **Package Manager**: Bun
- **Templating**: Handlebars (HBS)
- **Dependencies**:
  - `axios`: For making HTTP requests to external APIs.
  - `geoip-lite`: For IP-based geolocation.
  - `hbs`: Handlebars templating engine for Express.js.
- **Development**: `nodemon` is used for live reloading during development.

## Usage:

Users can access the application through their web browser. Upon visiting the root URL, the application will attempt to determine their location and display the weather forecast. Users can also provide a `country` query parameter (e.g., `/?country=France`) to get the weather for a specific country.

**Note**: This application requires a `WEATHER_API_KEY` environment variable to fetch data from the WeatherAPI.
