import axios from 'axios'
import { useState } from 'react'
import { Loader } from 'react-feather'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Input from '~/components/Input'

type User = {
  email: string
  password: string
  rememberMe: boolean
}

function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm<User>()
  const enviarDados: SubmitHandler<User> = async (data) => {
    setIsLoading(true)
    await axios
      .post('http://localhost:8000/auth/login', data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data)
        toast.success(response.data.message)
        setTimeout(() => {
          navigate('/chat')
        }, 1000)
      })
      .catch((error) => {
        console.error(error)
        toast.error(error.response?.data?.message || 'Erro ao cadastrar usuário.')
      })
    reset()
    setIsLoading(false)
  }

  return (
    <main className="w-full overflow-hidden bg-background-950 flex items-center justify-center h-full">
      {/* remove a altura na navbar da altura total */}
      <form onSubmit={handleSubmit(enviarDados)}>
        <h1 className="text-text-50 text-3xl font-bold flex items-center justify-center pb-5">
          Entrar
        </h1>

        <div className="max-w-sm min-w-[350px] text-text-50 flex flex-col gap-y-4">
          <Input
            label="E-mail:"
            type="email"
            id="email"
            register={register}
            register_options={{
              required: 'Campo obrigatório',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'E-mail inválido',
              },
            }}
            placeholder="Digite seu e-mail"
            error={errors.email?.message}
          />

          <Input
            label="Senha:"
            type="password"
            id="password"
            register={register}
            register_options={{
              required: 'Campo obrigatório',
              minLength: {
                value: 6,
                message: 'A senha deve ter no mínimo 6 caracteres',
              },
            }}
            placeholder="Digite seu senha"
            error={errors.password?.message}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent-600 text-[#FAFAFA] flex items-center justify-center py-2 px-4 rounded-lg mt-5 hover:bg-accent-500 disabled:bg-accent-600 transition-colors"
          >
            {isLoading ? <Loader className="animate-spin" /> : 'Fazer login'}
          </button>

          <div className='flex flex-col items-center gap-y-2 pt-4'>
            <p className="text-text-400 text-xs flex items-center justify-center">
              Ao fazer login você concorda com a nossa&nbsp;
              <Link
                to={'/privacy-policy'}
                className="text-accent-500 hover:underline"
                >
                Política de Privacidade
                </Link>
            </p>
            <p className="text-text-400 text-sm flex items-center justify-center">
              Já tem uma conta?&nbsp;
              <Link to={'/auth/login'} className="text-accent-500 hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </main>  )
}

export default Login
