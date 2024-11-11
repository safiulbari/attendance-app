// src/services/attendanceService.js

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
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getAttendanceData = async (startDate, endDate, userId) => {
  try {
    const response = await fetch("http://192.168.10.230:8000/get_attendence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        startDate,
        endDate,
        user_id: userId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    throw error;
  }
};

// New syncAttendance function
const syncAttendance = async () => {
  try {
    const response = await fetch("http://192.168.10.230:8000/sync_all_attendance", {
      method: "GET",
      headers: { accept: "application/json" },
    });
    if (response.ok) {
      console.log("Attendance synced successfully!");
      return true;
    } else {
      console.error("Error syncing attendance");
      return false;
    }
  } catch (error) {
    console.error("Error syncing attendance:", error);
    return false;
  }
};

// Export all functions to be used elsewhere
export { fetchUsers, getAttendanceData, syncAttendance };
