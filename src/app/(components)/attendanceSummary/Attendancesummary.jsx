
// AttendanceSummary.js
import React from "react";

const AttendanceSummary = ({ students, attendance }) => {
  // Calculate the number of students present and absent today
  const presentStudents = students.filter((student) => attendance[student.id]);
  const absentStudents = students.filter((student) => !attendance[student.id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Attendance Summary</h1>
      <div>
        <h2>Present Students:</h2>
        <ul>
          {presentStudents.map((student) => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Absent Students:</h2>
        <ul>
          {absentStudents.map((student) => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AttendanceSummary;
