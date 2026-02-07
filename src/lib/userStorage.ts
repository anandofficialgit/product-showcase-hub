// User storage utility - stores user data in localStorage as JSON
// In a production app, this would be replaced with a backend API

export interface User {
  name: string;
  mobileNumber: string;
  username: string;
  password: string; // In production, this should be hashed
}

const STORAGE_KEY = "users_data";

/**
 * Get all users from storage
 */
export const getUsers = (): User[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users:", error);
    return [];
  }
};

/**
 * Save a new user to storage
 */
export const saveUser = (user: User): boolean => {
  try {
    const users = getUsers();
    
    // Check if username already exists
    if (users.some(u => u.username === user.username)) {
      return false; // Username already exists
    }
    
    // Check if mobile number already exists
    if (users.some(u => u.mobileNumber === user.mobileNumber)) {
      return false; // Mobile number already exists
    }
    
    users.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving user:", error);
    return false;
  }
};

/**
 * Find a user by username
 */
export const findUserByUsername = (username: string): User | null => {
  const users = getUsers();
  return users.find(u => u.username === username) || null;
};

/**
 * Verify user credentials
 */
export const verifyUser = (username: string, password: string): User | null => {
  const user = findUserByUsername(username);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

/**
 * Export users as JSON string (for download/backup)
 */
export const exportUsersAsJSON = (): string => {
  const users = getUsers();
  return JSON.stringify(users, null, 2);
};

/**
 * Download users data as a JSON file
 */
export const downloadUsersAsFile = (): void => {
  const jsonData = exportUsersAsJSON();
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "users_data.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
