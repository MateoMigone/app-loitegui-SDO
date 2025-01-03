import { getAuth } from "firebase/auth";

export const updateTareaEstado = async (id, updatedData) => {
  try {
    // Get the current user's token
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    // Make a PATCH request to the Firebase function
    const response = await fetch(
      `https://updatetareaestado-efud7l6bbq-uc.a.run.app?id=${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the user's token for authentication
        },
        body: JSON.stringify(updatedData), // Send the updated data
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update tarea estado.");
    }

    const data = await response.json();
    console.log("Tarea estado updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating tarea estado:", error);
    throw error;
  }
};
