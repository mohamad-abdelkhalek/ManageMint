<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $validated = request()->validate([
            'sort_field' => 'in:id,name,status,created_at',
            'sort_direction' => 'in:desc,asc',
            'name' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        $sortField = $validated['sort_field'] ?? 'id';
        $sortDirection = $validated['sort_direction'] ?? 'desc';

        $query = Task::query();

        if ($validated['name'] ?? false) {
            $query->where('name', 'like', '%' . $validated['name'] . '%');
        }

        if ($validated['status'] ?? false) {
            $query->where('status', $validated['status']);
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => [
                'sort_field' => $sortField,
                'sort_direction' => $sortDirection,
                'name' => $validated['name'] ?? '',
                'status' => $validated['status'] ?? '',
            ],
            'success' => session('success'),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()
        ->orderBy('name')
        ->get();

        $users = User::query()
        ->orderBy('name')
        ->get();

        return inertia("Task/Create", [
            'projects' => ProjectResource::collection($projects),
            'users'=> UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();

        // Ensure image is optional and handle it explicitly
        $image = $request->file('image');
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        // Handle image upload
        if ($image) {
            $data['image_path'] = $image->store('tasks/' . uniqid(), 'public');
        }

        // Create the task
        Task::create($data);

        return to_route('task.index')->with('success', 'Task was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()
        ->orderBy('name')
        ->get();

        $users = User::query()
        ->orderBy('name')
        ->get();

        return inertia("Task/Edit", [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users'=> UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        try {
            // Get validated data
            $data = $request->validated();
            $data['updated_by'] = Auth::id();

            // Handle image upload if present
            if ($request->hasFile('image')) {
                $image = $request->file('image');

                // Delete old image directory if exists
                if ($task->image_path && Storage::disk('public')->exists(dirname($task->image_path))) {
                    Storage::disk('public')->deleteDirectory(dirname($task->image_path));
                }

                // Store new image
                $data['image_path'] = $image->store('tasks/' . uniqid(), 'public');
            }

            // Update task
            $task->update($data);

            return to_route('task.index')
                ->with('success', value: 'Task "' . $task->name . '" was updated');
        } catch (\Exception $e) {
            Log::error('Task update failed: ' . $e->getMessage());

            return to_route('task.index')
                ->with('error', 'Failed to update task. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();
        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return to_route('task.index')
            ->with('success', value: 'Task "' . $name . '" was deleted');
    }

    public function myTasks() {
        $validated = request()->validate([
            'sort_field' => 'in:id,name,status,created_at',
            'sort_direction' => 'in:desc,asc',
            'name' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        $sortField = $validated['sort_field'] ?? 'id';
        $sortDirection = $validated['sort_direction'] ?? 'desc';

        $user = Auth::user();
        $query = Task::query()->where('assigned_user_id', $user->id);

        if ($validated['name'] ?? false) {
            $query->where('name', 'like', '%' . $validated['name'] . '%');
        }

        if ($validated['status'] ?? false) {
            $query->where('status', $validated['status']);
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => [
                'sort_field' => $sortField,
                'sort_direction' => $sortDirection,
                'name' => $validated['name'] ?? '',
                'status' => $validated['status'] ?? '',
            ],
            'success' => session('success'),
        ]);
    }
}
