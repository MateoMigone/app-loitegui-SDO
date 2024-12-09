import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig.mjs";

// Function for getting all comentarios by tarea_id
export const fetchComentarios = async (tareaId) => {
  // Reference for the "comentarios" collection
  const comentariosRef = collection(db, "comentarios");

  // Query for getting all comments from the same task
  const q = query(comentariosRef, where("tarea_estado_id", "==", tareaId));

  // Fetching data with the query
  const querySnapshot = await getDocs(q);

  // Structuring the data
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
};
