export interface Task {
    id: string;
    title: string;
    description: string;
    status: "open" | "completed";
    due_date?: string;
    userId: string;
    created_at: string;
    updated_at: string;
}

export interface CreateTaskData {
    title: string;
    description: string;
    due_date?: string;
}

export interface UpdateTaskData {
    title?: string;
    description?: string;
    status?: "open" | "completed";
    due_date?: string;
}

export interface TaskFilters {
    status?: "open" | "completed";
    due_date?: string;
}
