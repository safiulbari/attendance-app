
# Attendance Tracking App

This is a web application built with React, Vite, and Tailwind CSS to track and manage employee attendance. It allows users to view and sync attendance data with a backend server. The application also integrates with a calendar for selecting date ranges and provides an easy-to-use interface to filter attendance data.

## Features

- **User Management**: Fetch and display a list of users.
- **Date Filtering**: Select a start and end date for attendance data.
- **Attendance Sync**: Sync attendance data between the frontend and backend with a single button.
- **Responsive Design**: Built with Tailwind CSS to ensure responsiveness on different screen sizes.
- **Optimized User Interface**: Using modern React practices for state management and rendering.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js (Backend API is assumed to be running locally or on a server at `http://192.168.10.230:8000`)
- **API Requests**: Fetch API for making HTTP requests to the backend

## Installation

### 1. Clone the Repository

First, clone this repository to your local machine.

```bash
git clone https://github.com/your-username/attendance-app.git
cd attendance-app
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn.

```bash
npm install
# or
yarn install
```

### 3. Setup Backend API

Make sure you have the backend API running at `http://192.168.10.230:8000` or modify the API endpoints in the code to point to the correct backend server.

### 4. Run the Application

To start the development server and view the app locally, run:

```bash
npm run dev
# or
yarn dev
```

This will start the app at `http://localhost:5173` by default.

## Usage

1. Select a user from the dropdown to view their attendance data.
2. Choose the start and end date using the date picker.
3. Click on the "Get Attendance" button to fetch attendance data for the selected user and date range.
4. Click the "Sync All Attendance" button to sync the data with the backend.

## Folder Structure

Here's a brief overview of the folder structure:

```
/src
  /assets             # Static assets like images or icons
  /components         # Reusable UI components (e.g., AttendanceForm, SyncButton)
  /icons              # Custom icons (e.g., CalendarIcon)
  /services           # API service logic for fetching data from the backend
  /utils              # Utility functions (e.g., date formatting)
  App.jsx             # Main application file
  index.jsx           # Entry point for the React app
  global.css          # Global styles, including Tailwind CSS imports
```

## Components

- **AttendanceForm**: The main form that allows the user to filter by user ID and date range and view attendance data.
- **SyncButton**: A button that allows the user to sync attendance data with the backend.
- **FilterSection**: The section within the `AttendanceForm` where the user selects a user and date range.
- **CalendarIcon**: A reusable calendar icon component used for labeling date fields.

## API Endpoints

This app communicates with a backend API. Below are the key endpoints used:

- `GET /all_user`: Fetch all users.
- `POST /get_attendence`: Get attendance data for a given user within a date range.
- `POST /sync_attendance`: Sync all attendance data with the backend.

## Contributing

We welcome contributions! If you'd like to improve the app, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Test your changes.
5. Commit your changes (`git commit -am 'Add new feature'`).
6. Push to your branch (`git push origin feature/your-feature`).
7. Create a new pull request.

## License

This project is open source and available under the MIT License.

## Acknowledgements

- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for creating custom designs.
- [Vite](https://vitejs.dev/) - A next-generation, fast build tool for frontend projects.
- [React Icons](https://react-icons.github.io/react-icons/) - A library for including vector icons in React projects.
- [Date-Fns](https://date-fns.org/) - A library for working with dates in JavaScript.
