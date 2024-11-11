// src/components/AttendanceForm/AttendanceTable.jsx

import React from "react";
import { formatTime12Hour, timeMaintained, calculateExpectedLogout } from "../../utils/dateUtils";

const AttendanceTable = ({ attendanceData }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <div className="overflow-x-auto mt-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Login Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Logout Time</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected Logout</th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceData.map((record, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{record.date}</td>
                <td className="px-4 py-2">{formatTime12Hour(record.login_time)}</td>
                <td className="px-4 py-2">{record.logout_time ? formatTime12Hour(record.logout_time) : calculateExpectedLogout(record.login_time) + " (expected)"} </td>
                {/* <td className="px-4 py-2">{calculateExpectedLogout(record.login_time)}</td> */}
                <td className="px-4 py-2">{timeMaintained(record.login_time, record.logout_time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
