import { db } from "../../firebaseConfig.mjs";
import { collection, getDocs } from "firebase/firestore";

// Function for getting all gremios
export const fetchGremios = async () => {
  // Fetching all docs from "gremios"
  const querySnapshot = await getDocs(collection(db, "gremios"));
  // Structuring the data
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
};
