"use client"
import { useState, useEffect } from "react";

import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDocs = async () => {
    try {
      const collectionName = collection(db, "Attendance");
      const docs = await getDocs(collectionName);
      const studentsData = [];
      docs.forEach((doc) => {
        studentsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setStudents(studentsData);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">List of Students</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">ID</th>
            <th className="p-2 border border-gray-300">Student Name</th>
            <th className="p-2 border border-gray-300">Student Email</th>
            <th className="p-2 border border-gray-300">Student Course</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="p-2 border border-gray-300">{student.id}</td>
              <td className="p-2 border border-gray-300">{student.name}</td>
              <td className="p-2 border border-gray-300">{student.email}</td>
              <td className="p-2 border border-gray-300">{student.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
    </button>
    </div>
  );
}
