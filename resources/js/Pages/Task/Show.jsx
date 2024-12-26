import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, task, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {`Task "${task.name}"`}
        </h2>
      }
    >
      <Head title={`Task "${task.name}"`} />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div>
              <img
                src={task.image_path}
                alt=""
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">Task ID</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {task.id}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Task Name</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {task.name}
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Task Status</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          TASK_STATUS_CLASS_MAP[task.status]
                        }`}
                      >
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Task Priority</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          TASK_PRIORITY_CLASS_MAP[task.priority]
                        }`}
                      >
                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {task.createdBy.name}
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">Due Date</label>
                    <p className="mt-1 mb-4 text-gray-600 dark:text-gray-400">
                      {task.due_date}
                    </p>
                  </div>
                  <div>
                    <label className="font-bold text-lg">Create Date</label>
                    <p className="mt-1 mb-4 text-gray-600 dark:text-gray-400">
                      {task.created_at}
                    </p>
                  </div>
                  <div>
                    <label className="font-bold text-lg">Updated By</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {task.updatedBy.name}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Project</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      <Link href={route("project.show", task.project.id)}>
                        {task.project.name}
                      </Link>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Assigned User</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {task.assignedUser.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="font-bold text-lg">Task Description</label>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  {task.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
