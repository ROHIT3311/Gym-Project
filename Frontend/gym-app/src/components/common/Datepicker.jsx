import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";

export default function Datepicker({ selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const renderHeader = () => (
    <div className="flex justify-between items-center px-4 py-2 border-b">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
        <span className="text-xl">{"‹"}</span>
      </button>
      <div className="text-lg font-medium">
        {format(currentMonth, "MMMM yyyy")}
      </div>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
        <span className="text-xl">{"›"}</span>
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const date = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-center text-sm font-medium text-gray-500 w-full"
        >
          {format(addDays(date, i), "EEE").charAt(0)}
        </div>
      );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isToday = isSameDay(day, new Date());
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, currentMonth);

        days.push(
          <div
            key={day}
            className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition 
              ${isSelected ? "bg-lime-300 text-black font-bold" : ""}
              ${isToday && !isSelected ? "border-2 border-lime-400" : ""}
              ${!isCurrentMonth ? "text-gray-300" : "text-gray-800"}
              hover:bg-lime-100`}
            onClick={() => onDateSelect(cloneDay)}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 place-items-center">
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="mx-auto bg-white rounded-lg w-auto p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
