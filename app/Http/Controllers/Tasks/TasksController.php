<?php

namespace App\Http\Controllers\Tasks;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Inertia\Inertia;

class TasksController extends Controller
{
    public function dashboard(Request $request)
    {
        $status = $request->input("status");
        $dueDate = $request->input("dueDate");

        $filters = [
            "status" => $status,
            "dueDate"  => $dueDate
        ];

        $tasks   = $this->getByTasks($filters);

        return Inertia::render('app/dashboard', [
            'tasks' => $tasks,
            'filters' => $filters,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        $user = $request->user();

        Task::create([
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? null,
            'due_date'    => $validated['due_date'] ?? null,
            'user_id'     => $user->id,
            'status'      => 'open', // default
        ]);

        return redirect()->back()->with('success', 'Tarefa criada com sucesso!');
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        $task->update($validated);

        return redirect()->back()->with('success', 'Tarefa atualizada com sucesso!');
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return redirect()->back()->with('success', 'Tarefa removida com sucesso!');
    }

    public function toggleStatus(Task $task)
    {
        $task->status = $task->status === 'completed' ? 'open' : 'completed';
        $task->save();

        return redirect()->back()->with('success', 'Status atualizado!');
    }

    private function getByTasks(array $filters = [])
    {
        $query = Task::query();

        if ($filters) {
            if (!empty($filters['status'])) {
                $query->where('status', $filters['status']);
            }

            if (!empty($filters['title'])) {
                $query->where('title', 'like', '%' . $filters['title'] . '%');
            }
        }

        return $query->orderBy("created_at", "desc")->orderBy("due_date", "desc")->get();
    }
}
