import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { QUESTIONS } from "../data/questions";

export const addTestData = async () => {} 
export const readTestData = async () => {} 

export const runFirestoreTest = async () => {
  console.log("Starting Firebase Question Migration...");
  
  try {
    // Force migration to clear/update all questions for multilingual schema:
    // const existing = await getDocs(collection(db, "questions"));
    // if (!existing.empty) {
    //   console.log(`Questions collection already populated. Skipping migration.`);
    //   return;
    // }

    console.log(`Uploading ${QUESTIONS.length} questions to Firestore... This might take a few seconds.`);
    let count = 0;
    for (const q of QUESTIONS) {
      if (!q.id) {
        console.warn("Skipping question with no ID:", q);
        continue;
      }
      const ref = doc(db, "questions", q.id);
      await setDoc(ref, q);
      count++;
    }
    console.log(`✅ Successfully uploaded ${count} questions to Firestore!`);
  } catch (e) {
    console.error("❌ Error uploading questions to Firestore: ", e);
  }
};
