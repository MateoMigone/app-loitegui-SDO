import { getAuth } from "firebase/auth";

// Create user doc api call
export const createUsuarioDoc = async (body) => {
  try {
    const response = await fetch("https://createuser-efud7l6bbq-uc.a.run.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to create user document");
    }

    console.log("User document created successfully");
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

// Fetch user doc api call
export const fetchUser = async () => {
  try {
    // Get the current user and their token
    const auth = getAuth();

    if (!auth.currentUser) {
      throw new Error("User not authenticated.");
    }

    const token = await auth.currentUser.getIdToken();

    // Call the Firebase Function
    const response = await fetch("https://getuser-efud7l6bbq-uc.a.run.app", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle the response
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user from API:", error);
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    const auth = getAuth(); // Ensure Firebase Authentication is initialized
    const token = await auth.currentUser.getIdToken(); // Get the user's ID token

    // Make the HTTP GET request
    const response = await fetch(
      "https://getallusers-efud7l6bbq-uc.a.run.app",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch users: ${errorData.error}`);
    }

    const users = await response.json();
    console.log("Fetched users:", users);

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const updateUser = async (uid, updatedData) => {
  try {
    const auth = getAuth(); // Ensure Firebase Authentication is initialized
    const token = await auth.currentUser.getIdToken(); // Get the user's ID token

    // Make the HTTP PATCH request
    const response = await fetch(
      `https://updateuser-efud7l6bbq-uc.a.run.app?uid=${uid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData), // Pass the updated data as JSON
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update user: ${errorData.error}`);
    }

    const result = await response.json();
    console.log("User updated successfully:", result);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const deleteUser = async (uid) => {
  try {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
      `https://deleteuser-efud7l6bbq-uc.a.run.app?uid=${uid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    const data = await response.json();
    console.log("User deleted successfully:", data);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
