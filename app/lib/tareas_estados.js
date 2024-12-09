import { db } from "../../firebaseConfig.mjs";
import { collection, getDocs, query, where } from "firebase/firestore";

// Function for getting all TareasEstados by level_id and tarea_id (should be 1 doc)
export const fetchTareaEstado = async (level_id, tarea_id) => {
  // Reference for the "tareas_estados" collection
  const tareasEstadosRef = collection(db, "tareas_estados");

  // Query for getting all docs matching a specific level_id and tarea_id (should be 1 doc)
  const q = query(
    tareasEstadosRef,
    where("level_id", "==", level_id),
    where("tarea_id", "==", tarea_id)
  );

  try {
    // Fetching data with the query
    const querySnapshot = await getDocs(q);
    // Checking if docs were found
    if (querySnapshot.empty) {
      console.log("No matching documents");
      // Returning null if no docs were found
      return null;
    }

    // Structuring the data fetched
    const docData = {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };

    // Returning the data
    return docData;
  } catch (error) {
    // Logging error message
    console.error("Error fetching document:", error);
  }
};
