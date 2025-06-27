import React, { useState } from "react";
import { Navbar, Logo, Title, Input, Button, Lines } from "../components";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const token = await signIn(email, senha);
      login(token);
      navigate("/map");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-10">
        <div>
          <Logo />
        </div>

        <div className="pt-6 pb-4 text-white">
          <Title welcome="Seja bem vindo ao" title="SABORIZE" />
        </div>

        <div className="pb-10">
          <Lines />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="pb-7 text-white font-light text-xs ">
            <Input
              label="E-mail ou nome do usuário"
              placeholder="Digite seu email..."
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pb-4 text-white font-light text-xs">
            <Input
              label="Senha"
              placeholder="Digite sua senha..."
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          {erro && <p style={{ color: "red" }}>{erro}</p>}
          <div className="text-center pt-10 ">
            <Button type="submit">Entrar</Button>
          </div>
        </form>

        <div className="text-center pt-5">
          <Link
            to="/register"
            className="text-white hover:underline text-sm"
          >

            Cadastre-se
          </Link>
        </div>
      </div>
    </>
  );
}