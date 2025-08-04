import { useEffect, useState } from "react";
import { CreateTaskData, Task, UpdateTaskData } from "@/types/tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface TaskFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateTaskData | UpdateTaskData) => void;
    task?: Task | null;
    isLoading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    task,
    isLoading = false,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "open" as "open" | "completed",
        due_date: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const submitData = {
            title: formData.title,
            description: formData.description,
            ...(task && { status: formData.status }),
            ...(formData.due_date && { due_date: formData.due_date }),
        };

        onSubmit(submitData);
    };

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                status: task.status,
                due_date: task.due_date || "",
            });
        } else {
            setFormData({
                title: "",
                description: "",
                status: "open",
                due_date: "",
            });
        }
    }, [task, isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {task ? "Editar Tarefa" : "Nova Tarefa"}
                    </DialogTitle>
                    <DialogDescription>
                        {task
                            ? "Atualize as informações da tarefa abaixo."
                            : "Preencha as informações para criar uma nova tarefa."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Título *</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            placeholder="Digite o título da tarefa"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição *</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Descreva os detalhes da tarefa"
                            rows={3}
                            required
                        />
                    </div>

                    {task && (
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value: "open" | "completed") =>
                                    setFormData({ ...formData, status: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="open">Aberta</SelectItem>
                                    <SelectItem value="completed">
                                        Concluída
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="dueDate">Data de Vencimento</Label>
                        <Input
                            id="dueDate"
                            type="date"
                            value={formData.due_date}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    due_date: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                              variant="gradient"
                            disabled={
                                isLoading ||
                                !formData.title.trim() ||
                                !formData.description.trim()
                            }
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    {task ? "Atualizando..." : "Criando..."}
                                </>
                            ) : task ? (
                                "Atualizar"
                            ) : (
                                "Criar Tarefa"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
