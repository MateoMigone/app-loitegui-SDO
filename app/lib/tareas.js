import { getAuth } from "firebase/auth";

export const fetchTareasWithEstados = async (gremioId, levelId) => {
  try {
    // Validate required parameters
    if (!gremioId || !levelId) {
      throw new Error("Both gremioId and levelId are required.");
    }

    // Get the current user and their token
    const auth = getAuth();

    if (!auth.currentUser) {
      throw new Error("User not authenticated.");
    }

    const token = await auth.currentUser.getIdToken();

    // Make the API call to the Firebase function
    const response = await fetch(
      `https://gettareaswithestados-efud7l6bbq-uc.a.run.app?gremioId=${gremioId}&levelId=${levelId}`,
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

    const tareasData = await response.json();
    return tareasData;
  } catch (error) {
    console.error("Error fetching tareas with estados from API:", error);
    throw error;
  }
};
