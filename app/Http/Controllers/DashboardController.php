<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {

        $user = Auth::user();

        $totalPendingTasks = Task::query()
            ->where('status', 'pending')
            ->count();

        $myPendingTasks = Task::query()
            ->where('status', 'pending')
            ->where('assigned_user_id', $user->id)
            ->count();

        return inertia('Dashboard', compact('totalPendingTasks', 'myPendingTasks'));
    }
}
