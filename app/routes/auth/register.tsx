import React from 'react'

function Register() {
  return (
    <div className='w-full h-screen bg-[#0F0F0F] flex items-center justify-center'>
      <div>
        <p className='text-white text-4xl flex items-center justify-center pb-5' >Cadastre-se</p>

        <div className="w-full max-w-sm min-w-[350px]">
          <label className="block mb-1 text-sm pl-1 text-[#FAFAFA]">
            Nome:
          </label>
          <input className="w-full bg-[#1D1D1D]  placeholder:text-[#8D8D8D] text-[#FAFAFA] text-sm border border-transparent rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#1eb4c3]  hover:border-[#1eb4c3]" placeholder="Insira seu nome completo" />

          <label className="block mb-1 pt-4 text-sm pl-1 text-[#FAFAFA]">
            E-mail:
          </label>
          <input className="w-full bg-[#1D1D1D]  placeholder:text-[#8D8D8D] text-[#FAFAFA] text-sm border border-transparent rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#1eb4c3]  hover:border-[#1eb4c3]" placeholder="Insira seu e-mail" />

          <label className="block mb-1 pt-4 text-sm pl-1 text-[#FAFAFA]">
            Senha:
          </label>
          <input className="w-full bg-[#1D1D1D]  placeholder:text-[#8D8D8D] text-[#FAFAFA] text-sm border border-transparent rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#1eb4c3] hover:border-[#1eb4c3]" placeholder="Insira sua senha" />

          <label className="block mb-1 pt-4 text-sm pl-1 text-[#FAFAFA]">
            Confirme sua senha:
          </label>
          <input className="w-full bg-[#1D1D1D]  placeholder:text-[#8D8D8D] text-[#FAFAFA] text-sm border border-transparent rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-[#1eb4c3] hover:border-[#1eb4c3]" placeholder="Insira sua senha novamente" />

          <button className='w-full bg-[#1eb4c3] flex text-white items-center justify-center py-2 px-4 rounded-lg mt-5 hover:bg-[#1F8B96] transition-colors'>Entrar</button>


          <div>
            <p className='text-[#8D8D8D] text-xs flex items-center justify-center pt-3'>Ao fazer login você concorda com a nossa Política de Privacidade</p>
            <p className="text-[#8D8D8D] text-xs flex items-center justify-center">
              Já tem uma conta?&nbsp;
              <a href="/login" className="text-[#1F8B96] hover:underline">Faça login</a>
            </p>


          </div>
        </div>





      </div>



    </div >

  )
}
export default Register







