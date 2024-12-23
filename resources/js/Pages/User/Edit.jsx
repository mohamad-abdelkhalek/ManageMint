import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, user }) {
  // Initial form setup with existing user data
  const { data, setData, post, errors, reset, processing } = useForm({
    image: null, // Change to null since it's a file
    name: user.name || "",
    status: user.status || "",
    description: user.description || "",
    due_date: user.due_date || "",
    _method: "PUT", // Add this for method spoofing
  });

  // Submit handler with file upload
  const onSubmit = (e) => {
    e.preventDefault();

    // Create FormData instance
    const formData = new FormData();

    // Append all form fields
    Object.keys(data).forEach((key) => {
      // Only append image if it exists
      if (key === "image" && data[key] === null) return;
      formData.append(key, data[key]);
    });

    // Use post instead of put for file uploads
    post(route("user.update", user.id), {
      data: formData,
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        // Optional: Reset form or show success message
        reset("image");
      },
    });
  };

  // Handle file input change
  const handleImageChange = (e) => {
    setData("image", e.target.files[0]);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit user "{user.name}"
          </h2>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800
                shadow sm:rounded-lg"
            >
              {user.image_path && (
                <div className="mb-4">
                  <img
                    src={user.image_path}
                    alt="User Image"
                    className="w-64"
                  />
                </div>
              )}
              <div>
                <InputLabel
                  htmlFor="user_image_path"
                  value="User Image"
                />
                <TextInput
                  id="user_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={handleImageChange}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="user_name" value="User Name" />
                <TextInput
                  id="user_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="user_description"
                  value="User Description"
                />

                <TextAreaInput
                  id="user_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="user_due_date"
                  value="User Deadline"
                />
                <TextInput
                  id="user_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="user_status" value="User Status" />
                <SelectInput
                  id="user_status"
                  name="status"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.user_status} className="mt-2" />
              </div>

              <div className="mt-6 mb-0 flex justify-end gap-4">
                <Link
                  href={route("user.index")}
                  className="bg-gray-200 py-2 px-4 text-gray-800 font-medium 
               rounded-lg shadow-sm transition-all duration-200 
               hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                >
                  Cancel
                </Link>
                <button
                  className="bg-emerald-500 py-2 px-4 text-white font-medium 
               rounded-lg shadow-md transition-all duration-200 
               hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
