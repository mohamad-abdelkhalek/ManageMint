<?php

namespace App\Http\Requests;

use App\Enums\ProjectPriority;
use App\Enums\ProjectStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required", "max:255"],
            "image" => ["nullable", "image"],
            "description" => ["nullable", "string"],  // Made nullable as description can be empty
            "due_date" => ["nullable", "date"],  // Optional date field
            "project_id" => ["required", "exists:projects,id"],
            "assigned_user_id" => ["required", "exists:users,id"],

            "status" => [
                "required",
                Rule::enum(ProjectStatus::class)
            ], // enum validation

            "priority" => [
                "required",
                Rule::enum(ProjectPriority::class)
            ], // enum validation

        ];
    }
}
