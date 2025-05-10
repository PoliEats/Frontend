import React from 'react';
import '/app/variables.css';

function Register() {
  return (
    <div className='w-full overflow-hidden bg-[var(--background)] flex items-center justify-center h-[calc(100vh-4rem)]'> {/* remove a altura na navbar da altura total */}
      <div>
        <p className='text-[var(--text)] text-4xl flex items-center justify-center pb-5' >Cadastre-se</p>

        <div className="max-w-sm min-w-[350px] text-[var(--text)] ">
          <label className="block mb-1 text-sm pl-1">
            Nome:
          </label>
          <input className="w-full bg-[var(--foreground)]  placeholder:text-[var(--text-muted)] text-sm border border-transparent rounded-md px-3 py-2  focus:outline-none focus:border-[var(--accent)] hover:border-[var(--accent)] transition-colors" placeholder="Insira seu nome completo" />

          <label className="block mb-1 pt-4 text-sm pl-1 ">
            E-mail:
          </label>
          <input className="w-full bg-[var(--foreground)]  placeholder:text-[var(--text-muted)] text-sm border border-transparent rounded-md px-3 py-2 focus:outline-none focus:border-[var(--accent)] hover:border-[var(--accent)] transition-colors" placeholder="Insira seu e-mail" />

          <label className="block mb-1 pt-4 text-sm pl-1">
            Senha:
          </label>
          <input className="w-full bg-[var(--foreground)]  placeholder:text-[var(--text-muted)] text-sm border border-transparent rounded-md px-3 py-2 focus:outline-none focus:border-[var(--accent)] hover:border-[var(--accent)] transition-colors" placeholder="Insira sua senha" />

          <label className="block mb-1 pt-4 text-sm pl-1">
            Confirme sua senha:
          </label>
          <input className="w-full bg-[var(--foreground)]  placeholder:text-[var(--text-muted)] text-sm border border-transparent rounded-md px-3 py-2 focus:outline-none focus:border-[var(--accent)] hover:border-[var(--accent)] transition-colors" placeholder="Insira sua senha novamente" />

          <button className='w-full bg-[var(--accent)] text-[#FAFAFA] flex items-center justify-center py-2 px-4 rounded-lg mt-5 hover:bg-[var(--accent-hover)] transition-colors'>Entrar</button>

          <div>
            <p className='text-[var(--text-muted)] text-xs flex items-center justify-center pt-3'>
            Ao fazer login você concorda com a nossa&nbsp;
              <a href="/path/to/document.pdf" className="text-[var(--accent-hover)] hover:underline">Política de Privacidade</a>
            </p>
            <p className="text-[var(--text-muted)] text-xs flex items-center justify-center">
              Já tem uma conta?&nbsp;
              <a href="/login" className="text-[var(--accent-hover)] hover:underline">Faça login</a>
            </p>
          </div>
        </div>
      </div>
    </div >

  )
}
export default Register







