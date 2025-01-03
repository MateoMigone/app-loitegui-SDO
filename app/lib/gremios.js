import { getAuth } from "firebase/auth";

export const fetchGremios = async () => {
  try {
    // Get the current user and their token
    const auth = getAuth();

    if (!auth.currentUser) {
      throw new Error("User not authenticated.");
    }

    const token = await auth.currentUser.getIdToken();

    // Make the API call to the Firebase function
    const response = await fetch("https://getgremios-efud7l6bbq-uc.a.run.app", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const gremiosData = await response.json();
    return gremiosData;
  } catch (error) {
    console.error("Error fetching gremios from API:", error);
    throw error;
  }
};

// Function for getting all gremios for a level id
export const fetchGremiosByUnidad = async (unidadId) => {
  try {
    // Check if unidadId is provided
    if (!unidadId) {
      throw new Error("Unidad ID is required.");
    }

    // Get the current user and their token
    const auth = getAuth();

    if (!auth.currentUser) {
      throw new Error("User not authenticated.");
    }

    const token = await auth.currentUser.getIdToken();

    // Make the API call to the Firebase function
    const response = await fetch(
      `https://getgremiosbyunidad-efud7l6bbq-uc.a.run.app?unidadId=${unidadId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const gremiosData = await response.json();
    return gremiosData;
  } catch (error) {
    console.error("Error fetching gremios by unidad from API:", error);
    throw error;
  }
};
