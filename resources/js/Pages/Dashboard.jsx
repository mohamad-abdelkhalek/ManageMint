import { useState } from "react";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TaskCardSkeleton from "../Components/TaskCardSkeleton";
import TaskStatusCard from "../Components/TaskStatusCard";

export default function Dashboard({
  totalPendingTasks = 0,
  myPendingTasks = 0,
  totalProgressTasks = 0,
  myProgressTasks = 0,
  totalCompletedTasks = 0,
  myCompletedTasks = 0,
  activeTasks = { data: [] },
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState("due_date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter tasks based on status and search term
  const filteredTasks = activeTasks.data.filter((task) => {
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;
    const matchesSearch =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const multiplier = sortDirection === "asc" ? 1 : -1;
    return aValue > bValue ? multiplier : -multiplier;
  });

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        {/* Task Status Cards */}
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isLoading ? (
              <>
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
              </>
            ) : (
              <>
                <TaskStatusCard
                  title="Pending Tasks"
                  myTasks={myPendingTasks}
                  totalTasks={totalPendingTasks}
                  colorClass="text-amber-500"
                />
                <TaskStatusCard
                  title="In Progress Tasks"
                  myTasks={myProgressTasks}
                  totalTasks={totalProgressTasks}
                  colorClass="text-blue-500"
                />
                <TaskStatusCard
                  title="Completed Tasks"
                  myTasks={myCompletedTasks}
                  totalTasks={totalCompletedTasks}
                  colorClass="text-green-500"
                />
              </>
            )}
          </div>
        </div>

        {/* Active Tasks Table */}
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h3 className="text-xl font-semibold">My Active Tasks</h3>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 w-full md:w-auto"
                  />
                  {/* Status Filter */}
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 w-full md:w-auto"
                  >
                    <option value="all">All Status</option>
                    {Object.entries(TASK_STATUS_TEXT_MAP).map(
                      ([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                  role="table"
                  aria-label="Active Tasks"
                >
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {["ID", "Project Name", "Name", "Status", "Due Date"].map(
                        (header, index) => (
                          <th
                            key={index}
                            onClick={() =>
                              handleSort(header.toLowerCase().replace(" ", "_"))
                            }
                            className="px-3 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                            role="columnheader"
                            scope="col"
                          >
                            <div className="flex items-center">
                              {header}
                              {sortField ===
                                header.toLowerCase().replace(" ", "_") && (
                                <span className="ml-1">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </div>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTasks.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-3 py-4 text-center">
                          No tasks found
                        </td>
                      </tr>
                    ) : (
                      sortedTasks.map((task) => (
                        <tr
                          key={task.id}
                          className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-3 py-2">{task.id}</td>
                          <td className="px-3 py-2">
                            <Link
                              href={route("project.show", task.project.id)}
                              className="text-white hover:underline"
                            >
                              {task.project.name}
                            </Link>
                          </td>
                          <td className="px-3 py-2">
                            <Link
                              href={route("task.show", task.id)}
                              className="text-blue-400 hover:underline"
                            >
                              {task.name}
                            </Link>
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`px-2 py-1 rounded text-nowrap text-white ${
                                TASK_STATUS_CLASS_MAP[task.status]
                              }`}
                            >
                              {TASK_STATUS_TEXT_MAP[task.status]}
                            </span>
                          </td>
                          <td className="px-3 py-2">{task.due_date}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {activeTasks.data.length > 0 && (
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <div>
                    Showing {sortedTasks.length} of {activeTasks.data.length}{" "}
                    tasks
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
