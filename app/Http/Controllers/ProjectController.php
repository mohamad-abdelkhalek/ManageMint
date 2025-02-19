<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")) {
            $query->where("status", request("status"));
        }

        // ->onEachSide(1) control how many links (pages)
        // to show on each side of the current page when paginating.
        $projects = $query->orderBy($sortField, $sortDirection)
            ->paginate(10);

        return inertia("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
{
    $data = $request->validated();

    // Ensure image is optional and handle it explicitly
    $image = $request->file('image');
    $data['created_by'] = Auth::id();
    $data['updated_by'] = Auth::id();

    // Handle image upload
    if ($image) {
        $data['image_path'] = $image->store('projects/' . uniqid(), 'public');
    }

    // Create the project
    Project::create($data);

    return to_route('project.index')->with('success', 'Project was created');
}


    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")) {
            $query->where("status", request("status"));
        }

        // ->onEachSide(1) control how many links (pages)
        // to show on each side of the current page when paginating.
        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */ public function update(UpdateProjectRequest $request, Project $project)
    {
        try {
            // Get validated data
            $data = $request->validated();
            $data['updated_by'] = Auth::id();

            // Handle image upload if present
            if ($request->hasFile('image')) {
                $image = $request->file('image');

                // Delete old image directory if exists
                if ($project->image_path && Storage::disk('public')->exists(dirname($project->image_path))) {
                    Storage::disk('public')->deleteDirectory(dirname($project->image_path));
                }

                // Store new image
                $data['image_path'] = $image->store('projects/' . uniqid(), 'public');
            }

            // Update project
            $project->update($data);

            return to_route('project.index')
            ->with('success', value: 'Project "' . $project->name . '" was updated');
        } catch (\Exception $e) {
            Log::error('Project update failed: ' . $e->getMessage());

            return to_route('project.index')
            ->with('error', 'Failed to update project. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        $project->delete();
        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(dirname
            ($project->image_path));
        }
        return to_route('project.index')
        ->with('success', value: 'Project "' . $name . '" was deleted');
    }
}
