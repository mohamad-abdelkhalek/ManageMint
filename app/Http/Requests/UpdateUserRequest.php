<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $user = $this->route("user");

        return [
            "name" => ["required", "string", "max:255"],
            "email" => [
                "required",
                "email",
                Rule::unique('users')->ignore($user->id)
            ],
            "password" => [
                "nullable",
                "string",
                Password::min(8)
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->mixedCase(),
                "confirmed"
            ],
            "password_confirmation" => [
                Rule::requiredIf(fn() => $this->filled('password'))
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'This email is already taken by another user.',
            'password.confirmed' => 'The password confirmation does not match.'
        ];
    }
}
