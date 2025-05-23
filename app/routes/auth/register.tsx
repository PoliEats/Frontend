import React, { useState } from 'react'
import '/app/variables.css'
import { useForm, type SubmitHandler } from "react-hook-form";
import Input from "../../components/Input";
import axios from 'axios';
import { Loader } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';


interface User {
  name: string;
  cpf: number;
  email: string;
  password: string;
  confirmPassword: string
}

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, formState: { errors } } = useForm<User>();
  const enviarDados: SubmitHandler<User> = async (data) => {
    setIsLoading(true);
    await axios.post("http://localhost:8000/auth/register", data, {
      withCredentials: true,
    }).then((response) => {
      console.log(response.data);
      toast.success(response.data.message, {
        position:"top-center",
        autoClose: 3000,
        hideProgressBar:false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,

      })
    }).catch((error) => {
      console.error(error);
    })
    setIsLoading(false);
  }

  return (
    <main className="w-full overflow-hidden bg-[var(--background)] flex items-center justify-center h-[calc(100vh-4rem)]">{/* remove a altura na navbar da altura total */}
    <ToastContainer/>
      <form onSubmit={handleSubmit(enviarDados)}>
        <h1 className="text-[var(--text)] text-4xl flex items-center justify-center pb-5">
          Cadastre-se
        </h1>

        <div className="max-w-sm min-w-[350px] text-[var(--text)] ">
          <Input
            label="Nome:"
            type="text"
            id="name"
            register={register}
            register_options={{ required: "Campo obrigatório" }}
            placeholder="Digite seu nome completo"
            error={errors.name?.message}
          />

          <Input
            label="CPF:"
            type="number"
            id="cpf"
            register={register}
            register_options={{ required: "Campo obrigatório" }}
            placeholder="Digite seu CPF"
            error={errors.cpf?.message}
          />

          <Input
            label="E-mail:"
            type="email"
            id="email"
            register={register}
            register_options={{ required: "Campo obrigatório" }}
            placeholder="Digite seu e-mail"
            error={errors.email?.message}
          />

          <Input
            label="Senha:"
            type="text"
            id="password"
            register={register}
            register_options={{ required: "Campo obrigatório" }}
            placeholder="Digite seu senha"
            error={errors.password?.message}
          />


          <Input
            label="Confirme sua senha:"
            type="password"
            id="confirmPassword"
            register={register}
            register_options={{ required: "Campo obrigatório" }}
            placeholder="Digite seu senha novamente"
            error={errors.confirmPassword?.message}
          />

          <button type="submit" disabled={isLoading} className="w-full bg-[var(--accent)] text-[#FAFAFA] flex items-center justify-center py-2 px-4 rounded-lg mt-5 hover:bg-[var(--accent-hover)] disabled:bg-[var(--accent)] transition-colors">
            {isLoading ? (
              <Loader className='animate-spin'/>
            ) : (
              "Cadastrar"
            )}
          </button>

          <div>
            <p className="text-[var(--text-muted)] text-base flex items-center justify-center pt-3">
              Já tem uma conta?&nbsp;
              <a
                href="/login"
                className="text-[var(--accent-hover)] hover:underline"
              >
                Faça login
              </a>
            </p>
            <p className="text-[var(--text-muted)] text-xs flex items-center justify-center">
              Ao fazer login você concorda com a nossa&nbsp;
              <a
                href="/path/to/document.pdf"
                className="text-[var(--accent-hover)] hover:underline"
              >
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>
      </form>
    </main>
  )
}
  export default Register
