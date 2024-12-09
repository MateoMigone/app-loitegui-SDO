import { db } from "../../firebaseConfig.mjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fetchTareaEstado } from "./tareas_estados";

// Function for fetching all tareas by gremio_id
export const fetchTareasByGremio = async (gremioId) => {
  // Reference for the "tareas" collection
  const tareasRef = collection(db, "tareas");
  // Query for getting all docs matching a "gremio_id"
  const q = query(tareasRef, where("gremio_id", "==", gremioId));

  // Fetching the data with the query
  const querySnapshot = await getDocs(q);
  // Structuring the data fetched
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(data);

  // Returning the data
  return data;
};

// Function for getting all tareas with estados included
export const fetchTareasWithEstados = async (gremioId, levelId) => {
  // Fetching all tareas by gremio
  const tareasData = await fetchTareasByGremio(gremioId);

  // Promises for fetching all tareas with estados
  const tareasPromises = tareasData.map(async (tarea) => {
    // Fetching all tareas with estados
    const results = await fetchTareaEstado(levelId, tarea.id);
    console.log(results);

    // Result data for the promise
    return { title: tarea.title, ...results };
  });

  // Resolving all promises
  const estadosResults = await Promise.all(tareasPromises);

  // Returning promises result
  return estadosResults;
};
