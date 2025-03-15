"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom"; // Adicione useNavigate

const signupSchema = z
  .object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate(); 

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const response = await fetch("http://localhost/api/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      if (result.error) {
        console.error(result.error);
        alert("Erro ao cadastrar: " + result.error);
      } else {
        console.log("Sucesso:", result);
        alert("Cadastro realizado com sucesso!");
        navigate("/login"); 
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
          <CardTitle className="text-3xl font-bold">Criar Conta</CardTitle>
          <p className="text-sm text-gray-600">
            Digite suas informações para criar uma conta
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <Input type="text" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <Input type="email" {...register("email")} placeholder="nome@exemplo.com" />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <Input type="password" {...register("password")} />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
              <Input type="password" {...register("confirmPassword")} />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full bg-black text-white">
              Criar Conta
            </Button>
            <p className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Entrar
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}