// Format date to YYYY-MM-DD
export const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// Format time to 12-hour format (e.g., 02:30 PM)
export const formatTime12Hour = (time) => {
  const [hour, minute, second] = time.split(":");
  const date = new Date();
  date.setHours(hour, minute, second);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
};

// Calculate expected logout time based on login time (assuming 8:30 hours of work)
export const calculateExpectedLogout = (loginTime) => {
  const [hours, minutes, seconds] = loginTime.split(":");
  const loginDate = new Date();
  loginDate.setHours(parseInt(hours) + 8, parseInt(minutes) + 30, parseInt(seconds));
  return formatTime12Hour(loginDate.toTimeString().split(" ")[0]);
};

// Calculate time maintained (check if the time worked meets the expected hours)
export const timeMaintained = (loginTime, logoutTime) => {
  const login = new Date(`1970-01-01T${loginTime}Z`);
  const logout = logoutTime
    ? new Date(`1970-01-01T${logoutTime}Z`)
    : new Date(login.getTime() + 8.5 * 60 * 60 * 1000); // Default 8.5 hours
  const hoursWorked = (logout - login) / (1000 * 60 * 60);
  const loginBefore1030 = login.getUTCHours() < 10 || (login.getUTCHours() === 10 && login.getUTCMinutes() <= 30);
  return loginBefore1030 && hoursWorked >= 8.5 ? "OK" : "Not OK";
};
