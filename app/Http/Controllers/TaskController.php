<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $validated = request()->validate([
        'sort_field' => 'in:id,name,status,created_at',
        'sort_direction' => 'in:asc,desc',
        'name' => 'nullable|string',
        'status' => 'nullable|string',
    ]);

    $sortField = $validated['sort_field'] ?? 'id';
    $sortDirection = $validated['sort_direction'] ?? 'asc';

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
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
