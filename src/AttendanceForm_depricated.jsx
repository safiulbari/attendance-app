import React, { useState, useEffect } from "react";

const CalendarIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const AttendanceForm = () => {
  const defaultEndDate = new Date();
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultEndDate.getDate() - 10);

  const [userId, setUserId] = useState("10");
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState(null);
  const [userList, setUserList] = useState([]);
  const [syncing, setSyncing] = useState(false); // for sync button loading state

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const formatTime12Hour = (time) => {
    const [hour, minute, second] = time.split(":");
    const date = new Date();
    date.setHours(hour, minute, second);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://192.168.10.230:8000/all_user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSyncAllAttendance = async () => {
    setSyncing(true);
    try {
      await fetch("http://192.168.10.230:8000/sync_all_attendance", {
        method: "GET",
        headers: { accept: "application/json" },
      });
      alert("Attendance synced successfully");
    } catch (error) {
      console.error("Error syncing attendance:", error);
      alert("Failed to sync attendance");
    } finally {
      setSyncing(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.10.230:8000/get_attendence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          user_id: userId,
        }),
      });
      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateExpectedLogout = (loginTime) => {
    const [hours, minutes, seconds] = loginTime.split(":");
    const loginDate = new Date();
    loginDate.setHours(parseInt(hours) + 8, parseInt(minutes) + 30, parseInt(seconds));
    return formatTime12Hour(loginDate.toTimeString().split(" ")[0]);
  };

  const timeMaintained = (loginTime, logoutTime) => {
    const login = new Date(`1970-01-01T${loginTime}Z`);
    const logout = logoutTime ? new Date(`1970-01-01T${logoutTime}Z`) : new Date(login.getTime() + 8.5 * 60 * 60 * 1000);
    const hoursWorked = (logout - login) / (1000 * 60 * 60);
    const loginBefore1030 = login.getUTCHours() < 10 || (login.getUTCHours() === 10 && login.getUTCMinutes() <= 30);
    return loginBefore1030 && hoursWorked >= 8.5 ? "OK" : "Not OK";
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">
      <div className="container mx-auto px-4 py-8 w-full max-w-6xl">
        <div className="space-y-8">
          {/* Sync Attendance Button */}
          <div className="flex justify-start">
            <button
              onClick={handleSyncAllAttendance}
              disabled={syncing}
              className="bg-slate-50 hover:bg-blue-800 hover:text-white text-blue-800 font-semibold  py-2 px-4 rounded-lg border border-blue-800"
            >
              {syncing ? "Syncing..." : "Sync All Attendance"}
            </button>
          </div>

          {/* Filter Section */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg"
            >
              {loading ? "Fetching Data..." : "Get Attendance"}
            </button>
          </div>

          {/* Attendance Data Table */}
          {attendanceData && (
            <div className="bg-white shadow-md p-6 rounded-lg">
              <div className="overflow-x-auto mt-4">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Login Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Logout Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected Logout</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceData.map((record, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">{record.date}</td>
                        <td className="px-4 py-2">{formatTime12Hour(record.login_time)}</td>
                        <td className="px-4 py-2">{record.logout_time ? formatTime12Hour(record.logout_time) : "N/A"}</td>
                        <td className="px-4 py-2">{calculateExpectedLogout(record.login_time)}</td>
                        <td className="px-4 py-2">{timeMaintained(record.login_time, record.logout_time)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;
