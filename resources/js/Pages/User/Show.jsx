import {
  USER_STATUS_CLASS_MAP,
  USER_STATUS_TEXT_MAP,
} from "@/constants.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, user, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {`User "${user.name}"`}
        </h2>
      }
    >
      <Head title={`User "${user.name}"`} />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div>
              <img
                src={user.image_path}
                alt=""
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">User ID</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {user.id}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">User Name</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {user.name}
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">User Status</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          USER_STATUS_CLASS_MAP[user.status]
                        }`}
                      >
                        {USER_STATUS_TEXT_MAP[user.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {user.createdBy.name}
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">Due Date</label>
                    <p className="mt-1 mb-4 text-gray-600 dark:text-gray-400">
                      {user.due_date}
                    </p>
                  </div>
                  <div>
                    <label className="font-bold text-lg">Create Date</label>
                    <p className="mt-1 mb-4 text-gray-600 dark:text-gray-400">
                      {user.created_at}
                    </p>
                  </div>
                  <div>
                    <label className="font-bold text-lg">Updated By</label>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {user.updatedBy.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="font-bold text-lg">User Description</label>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  {user.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {tasks?.isLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
                </div>
              ) : tasks?.error ? (
                <div className="text-red-500">
                  Error loading tasks: {tasks.error.message}
                </div>
              ) : tasks?.data?.length > 0 ? (
                <TasksTable
                  tasks={tasks}
                  queryParams={queryParams}
                  hideUserColumn={true}
                />
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No tasks available for this user.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
