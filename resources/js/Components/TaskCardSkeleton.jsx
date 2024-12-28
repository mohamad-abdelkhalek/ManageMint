const TaskCardSkeleton = () => (
  <div className="animate-pulse overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
    <div className="p-6">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-4"></div>
    </div>
  </div>
);

export default TaskCardSkeleton;
