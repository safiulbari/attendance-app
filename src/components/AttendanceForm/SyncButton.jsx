// src/components/SyncButton.jsx

import React, { useState } from "react";
import { syncAttendance } from '../../services/attendanceService';

const SyncButton = () => {
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncAttendance(); // This triggers the backend sync
    } catch (error) {
      console.error("Error during sync:", error);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <button
      onClick={handleSync}
      disabled={syncing}
      className={`w-xl py-3 px-6 rounded-lg font-semibold 
        ${syncing 
          ? 'border-gray-400 text-gray-400 cursor-not-allowed' 
          : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
        }`}
    >
      {syncing ? "Syncing..." : "Sync All Attendance"}
    </button>
  );
};

export default SyncButton;
