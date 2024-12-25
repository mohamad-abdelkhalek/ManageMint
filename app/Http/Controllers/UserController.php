<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCRUDResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }

        // ->onEachSide(1) control how many links (pages)
        // to show on each side of the current page when paginating.
        $users = $query->orderBy($sortField, $sortDirection)
            ->paginate(10);

        return inertia("User/Index", [
            "users" => UserCRUDResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        // Validate and prepare data
        $data = $request->validated();
        $data['email_verified_at'] = now(); // Use Laravel's now() helper for clarity
        $data['password'] = bcrypt($data['password']);

        // Create the user
        User::create($data);

        // Redirect with success message
        return to_route('user.index')
            ->with('success', 'User was created successfully');
    }


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new UserCRUDResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            // Get validated data
            $data = $request->validated();
            $password = $data['password'] ?? null;

            if ($password) {
                $data['password'] = bcrypt($password);
            } else {
                unset($data['password']);
            }

            // Update user
            $user->update($data);

            return to_route('user.index')
                ->with('success', value: 'User "' . $user->name . '" was updated');
        } catch (\Exception $e) {
            Log::error('User update failed: ' . $e->getMessage());

            return to_route('user.index')
                ->with('error', 'Failed to update user. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();

        return to_route('user.index')
            ->with('success', value: 'User "' . $name . '" was deleted');
    }
}
