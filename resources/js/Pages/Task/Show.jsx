import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, task }) {
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
                  <div className="mt-4 space-y-2">
                    <label
                      htmlFor="project-link"
                      className="block font-semibold text-lg text-gray-900 dark:text-gray-100"
                    >
                      Project
                    </label>

                    <p className="text-gray-600 dark:text-gray-400">
                      <Link
                        id="project-link"
                        href={route("project.show", task.project.id)}
                        className="inline-flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                      >
                        {task.project.name}
                        <svg
                          className="w-4 h-4 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
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
