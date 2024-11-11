// userService.js

// Fetch all users
export const fetchUsers = async () => {
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
    throw new Error("Failed to fetch users");
  }
};

// You can add more user-related API calls here in the future if needed
