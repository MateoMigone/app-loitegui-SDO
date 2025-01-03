import { getAuth } from "firebase/auth";

export const downloadPdf = async (obraId, gremioId, gremioName) => {
  try {
    const auth = getAuth(); // Ensure Firebase Authentication is initialized
    const token = await auth.currentUser.getIdToken(); // Get the user's ID token

    const response = await fetch(
      `https://getreporte-efud7l6bbq-uc.a.run.app?obraId=${obraId}&gremioId=${gremioId}&gremioName=${gremioName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to download PDF");

    const url = response.url;
    return url;
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};
