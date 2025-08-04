import { Head, useForm, usePage } from "@inertiajs/react";
import { CheckCircle, Lock, Mail, User } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEventHandler } from "react";

export default function Login() {
    const pageProps = usePage().props as any;

    const { data, setData, post } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const handleLogin: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("auth.authenticate"));
    };

    const handleRegister: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("auth.register"));
    };

    console.log("pageProps:: ", pageProps);

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
                <div className="w-full max-w-md animate-fade-in">
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-elegant">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            TaskManager
                        </h1>
                        <p className="text-muted-foreground">
                            Gerencie suas tarefas com eficiência
                        </p>
                    </div>

                    <Card className="shadow-card border-0">
                        <CardHeader className="text-center">
                            <CardTitle>Bem-vindo</CardTitle>
                            <CardDescription>
                                Entre em sua conta ou crie uma nova para começar
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="login" className="space-y-4">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="login">
                                        Entrar
                                    </TabsTrigger>
                                    <TabsTrigger value="register">
                                        Registrar
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent
                                    value="login"
                                    className="space-y-4"
                                >
                                    <form
                                        className="space-y-4"
                                        onSubmit={handleLogin}
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="login-email">
                                                Email
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="login-email"
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    placeholder="seu@email.com"
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="login-password">
                                                Senha
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="login-password"
                                                    type="password"
                                                    name="password"
                                                    placeholder="••••••••"
                                                    value={data.password}
                                                    onChange={(e) =>
                                                        setData(
                                                            "password",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            type="submit"
                                            variant="gradient"
                                            className="w-full"
                                        >
                                            Entrar
                                        </Button>
                                    </form>
                                </TabsContent>

                                <TabsContent
                                    value="register"
                                    className="space-y-4"
                                >
                                    {pageProps?.flash?.message && (
                                        <div className="bg-yellow-400 p-2 rounded-md">
                                            <p className="text-sm font-thin text-center">
                                                {pageProps?.flash?.message}
                                            </p>
                                        </div>
                                    )}
                                    <form
                                        className="space-y-4"
                                        onSubmit={handleRegister}
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="register-name">
                                                Nome
                                            </Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="register-name"
                                                    type="text"
                                                    placeholder="Seu nome"
                                                    className="pl-10"
                                                    value={data.name}
                                                    name="name"
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="register-email">
                                                Email
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="register-email"
                                                    type="email"
                                                    placeholder="seu@email.com"
                                                    className="pl-10"
                                                    name="email"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="register-password">
                                                Senha
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="register-password"
                                                    type="password"
                                                    value={data.password}
                                                    placeholder="••••••••"
                                                    className="pl-10"
                                                    name="password"
                                                    onChange={(e) =>
                                                        setData(
                                                            "password",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            type="submit"
                                            variant="gradient"
                                            className="w-full"
                                        >
                                            Criar Conta
                                        </Button>
                                    </form>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
