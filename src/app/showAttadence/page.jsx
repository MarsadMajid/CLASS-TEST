import React from 'react'
import AttendanceSummary from "../(components)/attendanceSummary/Attendancesummary";
export default function page() {
  return (
    
    <div>
        <AttendanceSummary students={students} attendance={attendance} />
    </div>
  )
}
