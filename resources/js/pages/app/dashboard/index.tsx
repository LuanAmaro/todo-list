import { useMemo, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";

import { Calendar, CheckCircle2, Circle, LogOut, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskForm } from "@/components/TaskForm";
import { Task, TaskFilters } from "@/types/tasks";
import { TaskCard } from "../../../components/TaskCard";
import { TaskFilters as FilterComponent } from "@/components/TaskFilters";
import { User } from "@/types";

export default function Dashboard({ tasks }: { tasks: Task[] }) {
    const pageProps = usePage().props as {
        auth?: { user?: User };
        filters?: TaskFilters;
    };

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [filters, setFilters] = useState<TaskFilters>({});

    function handleSubmit(data: any) {
        setIsLoading(true);
        router.post("/tasks", data, {
            onSuccess: () => {
                setIsFormOpen(false);
                setIsLoading(false);
            },
            onError: () => setIsLoading(false),
        });
    }

    function handleEdit(data: any) {
        router.put(`/tasks/${editingTask?.id}`, data, {
            onSuccess: () => {
                setIsFormOpen(false);
                setIsLoading(false);
                setEditingTask(null);
            },
        });
    }

    function handleDelete(id: string) {
        if (!confirm("Tem certeza que deseja deletar esta tarefa?")) return;

        router.delete(`/tasks/${id}`);
    }

    function handleToggle(id: string) {
        router.patch(`/tasks/${id}/toggle`);
    }

    function handleFiltersChange(newFilters: TaskFilters) {
        setFilters(newFilters);
        router.get(
            "/",
            { ...newFilters },
            {
                preserveState: true,
                replace: true,
            }
        );
    }

    function logout() {
        router.post("/logout");
    }

    function handleClearFilters() {
        setFilters({});
        router.get(
            "/",
            {},
            {
                preserveState: true,
                replace: true,
            }
        );
    }

    return (
        <>
            <Head title="TaskManager" />
            <div className="min-h-screen bg-gradient-subtle">
                <header className="bg-card border-b shadow-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold">
                                        TaskManager
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        Bem-vindo, {pageProps.auth?.user?.name}!
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <Button
                                    onClick={() => setIsFormOpen(true)}
                                    className="w-full"
                                    variant="gradient"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Nova Tarefa
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={logout}
                                    className="flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sair
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-1">
                            <div className="space-y-4">
                                <FilterComponent
                                    filters={filters}
                                    onFiltersChange={handleFiltersChange}
                                    onClearFilters={handleClearFilters}
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            {tasks.length === 0 ? (
                                <Card className="shadow-card">
                                    <CardContent className="py-16 text-center">
                                        <CheckCircle2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                                        <h3 className="text-lg font-medium mb-2">
                                            {Object.keys(filters).length > 0
                                                ? "Nenhuma tarefa encontrada"
                                                : "Nenhuma tarefa criada"}
                                        </h3>
                                        <p className="text-muted-foreground mb-4">
                                            {Object.keys(filters).length > 0
                                                ? "Tente ajustar os filtros para ver mais resultados."
                                                : "Comece criando sua primeira tarefa."}
                                        </p>
                                        {Object.keys(filters).length === 0 && (
                                            <Button
                                                variant="gradient"
                                                onClick={() =>
                                                    setIsFormOpen(true)
                                                }
                                            >
                                                <Plus className="w-4 h-4 mr-1" />
                                                Criar Primeira Tarefa
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="space-y-4 animate-fade-in">
                                    {tasks.map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onEdit={(data) =>
                                                setEditingTask(data)
                                            }
                                            onDelete={handleDelete}
                                            onToggleStatus={handleToggle}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <TaskForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />

                <TaskForm
                    isOpen={!!editingTask}
                    onClose={() => setEditingTask(null)}
                    onSubmit={handleEdit}
                    task={editingTask}
                    isLoading={isLoading}
                />
            </div>
        </>
    );
}
