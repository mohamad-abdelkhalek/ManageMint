import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Edit({ auth, user }) {

  const [showPassword, setShowPassword] = useState(false);

  // Initial form setup with existing user data
  const { data, setData, post, errors, reset, processing } = useForm({
    name: user.name || "",
    email: user.email || "",
    password: "",
    password_confirmation: "",
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
                <InputLabel htmlFor="user_email" value="User Email" />
                <TextInput
                  id="user_email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  autoComplete="email"
                  placeholder="user@example.com"
                  required
                  onChange={(e) => setData("email", e.target.value)}
                  onBlur={(e) => {
                    // Client-side email validation
                    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                      e.target.value
                    );
                    if (!isValid && e.target.value) {
                      setErrors((prev) => ({
                        ...prev,
                        email: "Please enter a valid email address",
                      }));
                    }
                  }}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="user_password" value="Password" />
                <div className="relative">
                  <TextInput
                    id="user_password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full pr-10"
                    autoComplete="new-password"
                    onChange={(e) => setData("password", e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <InputError message={errors.password} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="user_password_confirmation"
                  value="Confirm Password"
                />
                <div className="relative">
                  <TextInput
                    id="user_password_confirmation"
                    type={showPassword ? "text" : "password"}
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full pr-10"
                    autoComplete="new-password"
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <InputError
                  message={errors.password_confirmation}
                  className="mt-2"
                />
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
