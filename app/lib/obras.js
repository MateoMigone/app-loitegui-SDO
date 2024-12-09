import { db } from "../../firebaseConfig.mjs";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// Function for getting all obras
export const fetchObras = async () => {
  // Fetching all data from "obras"
  const querySnapshot = await getDocs(collection(db, "obras"));
  // Structuring the data
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
};

// Function for getting obra by id
export const getObraById = async (docId) => {
  // Reference for a doc from the "obras" collection
  const docRef = doc(db, "obras", docId);

  try {
    // Fetching referenced doc
    const docSnap = await getDoc(docRef);
    // Checking if doc was found
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      // Return the data
      return docSnap.data();
    } else {
      console.log("No such document!");
      // Return null if no doc was found
      return null;
    }
  } catch (error) {
    // Logging error message
    console.error("Error getting document:", error);
  }
};
