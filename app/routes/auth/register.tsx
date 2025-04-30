import React from 'react'

function Register() {
  return (
    <div className='w-full h-screen bg-[#0F0F0F] flex items-center justify-center'>
      <div>
        <p className='text-white font-medium flex items-center justify-center pb-5'>Cadastre-se</p>

        <div className="w-full max-w-sm min-w-[350px]">
          <label className="block mb-2 text-sm pl-1 text-[#FAFAFA]">
            Nome:
          </label>
          <input className="w-full bg-[#1D1D1D]  placeholder:text-[#8D8D8D] text-[#FAFAFA] text-sm border border-transparent rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#8D8D8D]  hover:border-[#8D8D8D]" placeholder="Insira seu nome completo" />

          <label className="block mb-2 text-sm pl-1 text-[#FAFAFA]">
            E-mail:
          </label>
          <input className="w-full bg-[#1D1D1D]  placeholder:text-[#8D8D8D] text-[#FAFAFA] text-sm border border-transparent rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#8D8D8D]  hover:border-[#8D8D8D]" placeholder="Insira seu e-mail" />

          <label className="block mb-2 text-sm pl-1 text-[#FAFAFA]">
            Senha:
          </label>
          <input className="w-full bg-[#1D1D1D]  placeholder:text-[#8D8D8D] text-[#FAFAFA] text-sm border border-transparent rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#8D8D8D]  hover:border-[#8D8D8D]" placeholder="Insira sua senha" />

          <label className="block mb-2 text-sm pl-1 text-[#FAFAFA]">
            Confirme sua senha:
          </label>
          <input className="w-full bg-[#1D1D1D]  placeholder:text-[#8D8D8D] text-[#FAFAFA] text-sm border border-transparent rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#8D8D8D]  hover:border-[#8D8D8D]" placeholder="Insira sua senha novamente" />

        </div>

        <button className='bg-white flex items-center justify-center mt-3'>Entrar</button>

      </div>



    </div>

  )
}
export default Register







