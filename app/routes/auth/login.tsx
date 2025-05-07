import React, { useState } from "react";
import { Link } from "react-router";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login submitted:", { email, password, rememberMe });
    };

    return (
        <div className="w-full h-screen bg-[#0F0F0F] flex">
            {/* Botão fixo próximo à barra lateral */}
            {/* <div className="fixed m-5 h-screen w-16 ">
                <button className="bg-[#6200EE] text-white p-2 rounded-md hover:bg-[#7C4DFF] transition duration-300 ">
                    Menu
                </button>
            </div> */}

            <div className="w-full max-w-sm min-w-[350px] p-6 m-auto">
                <h1 className="text-[#FAFAFA] font-extrabold text-center pb-3 text-2xl">
                    Login
                </h1>
                <p className="text-[#FAFAFA] text-center pb-6">
                    Faça login para realizar o seu pedido!
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm pl-1 text-[#FAFAFA]">
                            Email:
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#1F1F1F] placeholder:text-[#8D8D8D] text-[#FAFAFA] text-sm border border-transparent rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#8D8D8D] hover:border-[#8D8D8D]"
                            placeholder="Insira o seu email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm pl-1 text-[#FAFAFA]">
                            Senha:
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#1F1F1F] placeholder:text-[#8D8D8D] text-[#FAFAFA] text-sm border border-transparent rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#8D8D8D] hover:border-[#8D8D8D]"
                            placeholder="Insira sua senha"
                            required
                        />
                    </div>

                    <div className="flex items-center mb-6">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="rememberMe" className="text-sm text-[#FAFAFA]">
                            Lembre-se de mim
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#1EB4C3] text-[#FAFAFA] py-2 rounded-md hover:bg-[#1eb5c3d6] transition duration-300 cursor-pointer"
                    >
                        Entrar
                    </button>
                </form>

                <div className="mt-5 text-center text-sm text-[#8D8D8D]">
                    <p className="mb-2">
                        Ainda não tem uma conta?{" "}
                        <Link to="/register" className="text-[#FAFAFA] underline">
                            Cadastre-se
                        </Link>
                    </p>

                    <p>
                        Ao fazer login você concorda com a nossa{" "}
                        <Link to="/privacy" className="text-[#8D8D8D] underline">
                            Política de Privacidade
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
