import React from "react";

const TaskStatusCard = ({ title, myTasks, totalTasks, colorClass }) => {
  const percentage = totalTasks > 0 ? (myTasks / totalTasks) * 100 : 0;
  let gradientColors;

  switch (colorClass) {
    case "text-amber-500":
      gradientColors = "from-amber-200 via-amber-400 to-amber-500";
      break;
    case "text-blue-500":
      gradientColors = "from-blue-200 via-blue-400 to-blue-500";
      break;
    case "text-green-500":
      gradientColors = "from-green-200 via-green-400 to-green-500";
      break;
    default:
      gradientColors = "from-gray-200 via-gray-400 to-gray-500";
  }

  return (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 hover:shadow-md transition-shadow duration-200">
      <div className="p-6 text-gray-900 dark:text-gray-100">
        <h3 className={`${colorClass} text-2xl font-semibold`}>{title}</h3>
        <p className="text-xl mt-4">
          <span className="mr-2">{myTasks}</span>/
          <span className="ml-2">{totalTasks}</span>
        </p>
        <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded mt-4">
          <div
            className={`absolute top-0 left-0 h-full rounded bg-gradient-to-r ${gradientColors} transition-all duration-300`}
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {percentage.toFixed(1)}% of total
        </p>
      </div>
    </div>
  );
};

export default TaskStatusCard;
