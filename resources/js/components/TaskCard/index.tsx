import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
    Calendar,
    Clock,
    MoreVertical,
    Edit,
    Trash2,
    CheckCircle2,
    Circle,
} from "lucide-react";

import { Task } from "@/types/tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onToggleStatus: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
    task,
    onEdit,
    onDelete,
    onToggleStatus,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
        } catch {
            return dateString;
        }
    };

    const isOverdue =
        task.due_date &&
        task.status === "open" &&
        new Date(task.due_date) < new Date();

    console.log("task:: ", task)

    return (
        <Card
            className={`transition-smooth hover:shadow-card hover:scale-[1.02] ${
                task.status === "completed" ? "opacity-75" : ""
            } ${isOverdue ? "border-destructive/50" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                            <Checkbox
                                checked={task.status === "completed"}
                                onCheckedChange={() => onToggleStatus(task.id)}
                                className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <CardTitle
                                className={`text-base leading-tight ${
                                    task.status === "completed"
                                        ? "line-through text-muted-foreground"
                                        : ""
                                }`}
                            >
                                {task.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge
                                    variant={
                                        task.status === "completed"
                                            ? "secondary"
                                            : "default"
                                    }
                                    className={
                                        task.status === "completed"
                                            ? ""
                                            : "bg-gradient-primary"
                                    }
                                >
                                    {task.status === "completed" ? (
                                        <>
                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                            Concluída
                                        </>
                                    ) : (
                                        <>
                                            <Circle className="w-3 h-3 mr-1" />
                                            Aberta
                                        </>
                                    )}
                                </Badge>
                                {isOverdue && (
                                    <Badge
                                        variant="destructive"
                                        className="text-xs"
                                    >
                                        <Clock className="w-3 h-3 mr-1" />
                                        Atrasada
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`transition-opacity ${
                                    isHovered ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(task)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDelete(task.id)}
                                className="text-destructive focus:text-destructive"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Excluir
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <p
                    className={`text-sm mb-3 ${
                        task.status === "completed"
                            ? "text-muted-foreground"
                            : "text-card-foreground"
                    }`}
                >
                    {task.description}
                </p>

                {task.due_date && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Vencimento: {formatDate(task.due_date)}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
