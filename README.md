# Car Analytics Project

Welcome to the **Car Analytics Project**! This project is developed as part of a university course for Web Development, focusing on building a responsive, user-friendly web application for analyzing and managing car statistics. The project leverages modern web technologies, including Vite for fast development, Tailwind CSS for styling, and Chart.js for data visualization. The application is deployed using GitHub Pages, ensuring easy access and sharing.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Team Members](#team-members)
- [License](#license)

## Description

The Car Analytics Project is a web application designed to provide an interactive platform for users to view, filter, and manage car statistics. The project offers a clean and intuitive interface where users can explore a wide range of car data, visualize statistics through charts, and manage their favorite cars. The application is built with React and uses advanced features such as React Router for navigation, and Context API for state management. The project also incorporates best practices in React, including the use of hooks like `useEffect`, `useState`, and prop drilling, to ensure a smooth user experience.

## Features

### Dashboard Page
- **Car Statistics Table**: Displays a comprehensive table of car statistics, including various metrics such as brand, model, year, and performance data.
- **Car Cards**: Each car is displayed as a card with essential information, providing a quick overview.
- **Filtering**: Users can filter car cards by brand and model, making it easier to find specific cars.
- **Chart Visualization**: Interactive bar charts powered by Chart.js to visualize car statistics.
- **Table Toggle**: Users can toggle the visibility of the statistics table for a more streamlined view.

### Highlighted Cars Page
- **Favorite Cars**: Users can add cars to their favorites, which will be displayed on this page.
- **Delete Feature**: Users can remove cars from their highlighted list, providing full control over their selection.

### Navigation & State Management
- **React Router**: Enables smooth navigation between the Dashboard and Highlighted Cars pages.
- **Context API**: Manages the state across different components, ensuring a consistent user experience.
- **Local Storage**: Favorites are stored in the browser's local storage, allowing users to persist their selections across sessions.

## Screenshots

### Dashboard Page
![Dashboard Page](path/to/dashboard-screenshot.png)
*Shows the car statistics table, car cards, and chart visualizations.*

### Highlighted Cars Page
![Highlighted Cars Page](path/to/highlighted-cars-screenshot.png)
*Displays the user's favorite cars with options to remove them.*

## Technologies Used

- **Vite**: Fast build tool for modern web projects.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Chart.js**: JavaScript library for creating charts.
- **React Router**: Library for handling routing in React applications.
- **Context API**: React feature for managing global state.
- **Local Storage**: Web API for storing data locally in the user's browser.
- **GitHub Pages**: Platform for hosting and deploying the application.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/car-analytics-project.git
   cd car-analytics-project
