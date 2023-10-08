// Import necessary dependencies and Firebase configuration
"use client"
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Import the AttendanceSummary component
import AttendanceSummary from "../(components)/attendanceSummary/Attendancesummary";

export default function Page() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(""); // Store the date

  const fetchDocs = async () => {
    try {
      const collectionName = collection(db, "FormData");
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

  const onToggleAttendance = (studentId) => {
    setAttendance((prevState) => ({
      ...prevState,
      [studentId]: !prevState[studentId], // Toggle the attendance status
    }));
  };

  const submitAttendance = async () => {
    try {
      const attendanceData = {
        date: new Date().toDateString(), // Get the current date
        attendance: attendance,
      };
      const attendanceCollection = collection(db, "Attendance"); // Change "Attendance" to your desired collection name
      await addDoc(attendanceCollection, attendanceData);
      console.log("Attendance submitted successfully.");
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

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
            <th className="p-2 border border-gray-300">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="p-2 border border-gray-300">{student.id}</td>
              <td className="p-2 border border-gray-300">{student.name}</td>
              <td className="p-2 border border-gray-300">{student.email}</td>
              <td className="p-2 border border-gray-300">{student.course}</td>
              <td className="p-2 border border-gray-300">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => onToggleAttendance(student.id)}
                    checked={attendance[student.id] || false}
                  />
                  Present
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={submitAttendance}
      >
        Submit Attendance
      </button>

      {/* Render the AttendanceSummary component */}
      <AttendanceSummary students={students} attendance={attendance} />
    </div>
  );
}
