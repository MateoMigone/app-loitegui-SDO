import { getAuth } from "firebase/auth";

export const fetchObras = async () => {
  try {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    const response = await fetch("https://getobras-efud7l6bbq-uc.a.run.app", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Function for getting obra by id
export const getObraById = async (obraId) => {
  try {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
      `https://getobrabyid-efud7l6bbq-uc.a.run.app?id=${obraId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Obra:", data);
    return data;
  } catch (error) {
    console.error("Error fetching obra:", error);
    return null;
  }
};
