// src/components/AttendanceForm/AttendanceForm.jsx

import React, { useState, useEffect } from "react";
import { fetchUsers, getAttendanceData, syncAttendance } from "../../services/attendanceService";
import FilterSection from "./FilterSection";
import AttendanceTable from "./AttendanceTable";
import SyncButton from "./SyncButton";
import { formatDate, formatTime12Hour, timeMaintained, calculateExpectedLogout } from "../../utils/dateUtils";

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

  useEffect(() => {
    fetchUsers().then(setUserList);
  }, []);

  const handleSyncAllAttendance = async () => {
    setSyncing(true);
    await syncAttendance();
    setSyncing(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = await getAttendanceData(formatDate(startDate), formatDate(endDate), userId);
    setAttendanceData(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center py-8">
      <div className="container mx-auto w-full max-w-6xl">
        <div className="space-y-8">
          {/* Sync Attendance Button */}
          <SyncButton syncing={syncing} onSync={handleSyncAllAttendance} />

          {/* Filter Section */}
          <FilterSection
            userList={userList}
            userId={userId}
            setUserId={setUserId}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {/* Attendance Data Table */}
          {attendanceData && <AttendanceTable attendanceData={attendanceData} />}
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;
