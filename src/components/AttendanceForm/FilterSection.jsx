// src/components/AttendanceForm/FilterSection.jsx

import React from "react";
import CalendarIcon from "../../icons/CalendarIcon"; // Correct
import { formatDate, formatTime12Hour, calculateExpectedLogout, timeMaintained } from '../../utils/dateUtils';


const FilterSection = ({ userList, userId, setUserId, startDate, setStartDate, endDate, setEndDate, onSubmit, loading }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User ID Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Select User ID</label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
          >
            {userList.map((user) => (
              <option key={user.id} value={user.user_id}>
                {user.name} (ID: {user.user_id})
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <CalendarIcon /> Start Date
          </label>
          <input
            type="date"
            value={formatDate(startDate)}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <CalendarIcon /> End Date
          </label>
          <input
            type="date"
            value={formatDate(endDate)}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Get Attendance Button */}
      <button
        onClick={onSubmit}
        disabled={loading}
        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg"
      >
        {loading ? "Fetching Data..." : "Get Attendance"}
      </button>
    </div>
  );
};

export default FilterSection;
