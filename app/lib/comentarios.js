import { getAuth } from "firebase/auth";

export const createComentario = async (description, tareaEstadoId) => {
  try {
    // Get the current user and their token
    const auth = getAuth();

    if (!auth.currentUser) {
      throw new Error("User not authenticated.");
    }

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
      "https://createcomentario-efud7l6bbq-uc.a.run.app",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
          tareaEstadoId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create comentario.");
    }

    const data = await response.json();
    console.log("Comentario created:", data);
    return data;
  } catch (error) {
    console.error("Error creating comentario:", error);
    throw error;
  }
};

export const fetchComentarios = async (tareaId) => {
  try {
    // Validate required parameter
    if (!tareaId) {
      throw new Error("The 'tareaId' query parameter is required.");
    }

    // Get the current user and their token
    const auth = getAuth();

    if (!auth.currentUser) {
      throw new Error("User not authenticated.");
    }

    const token = await auth.currentUser.getIdToken();

    // Make the API call to the Firebase function
    const response = await fetch(
      `https://getcomentarios-efud7l6bbq-uc.a.run.app?tareaId=${tareaId}`,
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

    const comentariosData = await response.json();
    return comentariosData;
  } catch (error) {
    console.error("Error fetching comentarios from API:", error);
    throw error;
  }
};

export const updateComentario = async (comentarioId, updates) => {
  try {
    const auth = getAuth();

    if (!auth.currentUser) {
      throw new Error("User not authenticated.");
    }

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
      `https://updatecomentario-efud7l6bbq-uc.a.run.app?comentarioId=${comentarioId}`,
      {
        method: "PATCH", // Use the PATCH HTTP method
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update comentario.");
    }

    console.log("Comentario updated successfully!");
  } catch (error) {
    console.error("Error updating comentario:", error);
    throw error;
  }
};

export const deleteComentario = async (comentarioId) => {
  try {
    // Validate required parameter
    if (!comentarioId) {
      throw new Error("The 'tareaId' query parameter is required.");
    }

    const auth = getAuth();

    if (!auth.currentUser) {
      throw new Error("User not authenticated.");
    }

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
      `https://deletecomentario-efud7l6bbq-uc.a.run.app?comentarioId=${comentarioId}`,
      {
        method: "DELETE", // Use the DELETE HTTP method
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete comentario.");
    }

    console.log("Comentario deleted successfully!");
  } catch (error) {
    console.error("Error deleting comentario:", error);
    throw error;
  }
};
