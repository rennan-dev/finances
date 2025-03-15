"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate(); 

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch("http://localhost/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (result.error) {
        console.error(result.error);
        alert("Erro ao fazer login: " + result.error);
      } else {
        console.log("Sucesso:", result);
        localStorage.setItem("user", JSON.stringify({ id: result.user.id, email: result.user.email }));
        alert("Login bem-sucedido!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">FinPlan</CardTitle>
          <p className="text-sm text-gray-600">
            Digite suas credenciais para acessar sua conta
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <Input type="email" {...register("email")} placeholder="nome@exemplo.com" />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <Input type="password" {...register("password")} placeholder="******" />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <div className="flex justify-between text-sm">
              <Link to="/forgot-password" className="text-blue-500 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <Button type="submit" className="w-full bg-black text-white">
              Entrar
            </Button>
            <p className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}