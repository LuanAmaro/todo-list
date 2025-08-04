import { Filter, X } from "lucide-react";
import { TaskFilters as Filters } from "@/types/tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskFiltersProps {
    filters: Filters;
    onFiltersChange: (filters: Filters) => void;
    onClearFilters: () => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
    filters,
    onFiltersChange,
    onClearFilters,
}) => {
    const hasActiveFilters = filters.status || filters.dueDate;

    const handleStatusChange = (value: string) => {
        onFiltersChange({
            ...filters,
            status:
                value === "all" ? undefined : (value as "open" | "completed"),
        });
    };

    const handleDueDateChange = (value: string) => {
        onFiltersChange({
            ...filters,
            dueDate: value || undefined,
        });
    };

    return (
        <Card className="shadow-card">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </CardTitle>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearFilters}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-4 h-4 mr-1" />
                            Limpar
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="status-filter">Status</Label>
                        <Select
                            value={filters.status || "all"}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Todos os status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="open">Abertas</SelectItem>
                                <SelectItem value="completed">
                                    Concluídas
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date-filter">Data de Vencimento</Label>
                        <Input
                            id="date-filter"
                            type="date"
                            value={filters.dueDate || ""}
                            onChange={(e) =>
                                handleDueDateChange(e.target.value)
                            }
                            placeholder="Filtrar por data"
                        />
                    </div>
                </div>

                {hasActiveFilters && (
                    <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                            Filtros ativos:{" "}
                            {filters.status && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs mr-1">
                                    {filters.status === "open"
                                        ? "Abertas"
                                        : "Concluídas"}
                                </span>
                            )}
                            {filters.dueDate && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                                    {new Date(
                                        filters.dueDate
                                    ).toLocaleDateString("pt-BR")}
                                </span>
                            )}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
