import React from 'react';
import celular from '../assets/celular.png';
import app from '../assets/app.png';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="flex flex-col gap-24 px-6 lg:px-20 font-lato mt-12 bg-[#0F0F0F]">

        {/* Primeiro bloco: título e imagem */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="space-y-6 max-w-lg w-full lg:w-1/2">
            <h1 className="text-[36px] lg:text-[64px] leading-tight">
              <b>PoliEats</b> – Peça, Consulte e Descubra com um Toque!
            </h1>
            {/* Botão de pedido desktop*/}
            <button className="hidden lg:inline-block cursor-pointer px-8 py-4 bg-[#1EB4C3] hover:bg-[#17a0ad] rounded-lg text-lg font-semibold transition transform hover:scale-105 duration-300">
              Faça seu pedido!
            </button>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 relative flex justify-center items-center">
            {/*bola azul que some*/}
            <div className="absolute w-[700px] h-[700px] rounded-full z-0 filter blur-2xl lg:block hidden" style={{ background: 'radial-gradient(circle at center, #269DA9 0%, #0F0F0F 100%)' }}></div>
            {/* Imagem do celular com efeito de transição */}
            <img src={celular} alt="Ilustração do aplicativo" className="w-[550px] h-auto relative z-10 transition-transform duration-300 transform hover:-translate-y-2" />
          </div>
        </div>

        {/* Botão "Faça seu pedido!" visível apenas no mobile */}
        <div className="w-full lg:hidden flex justify-start pl-6 mt-8">
          <button className="cursor-pointer px-8 py-4 bg-[#1EB4C3] hover:bg-[#17a0ad] rounded-lg text-lg font-semibold transition transform hover:scale-105 duration-300">
            Faça seu pedido!
          </button>
        </div>

        {/* Segundo bloco: título e imagem */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mt-8 lg:mt-4 relative flex justify-center items-center">
            {/* Efeito de fundo para a imagem */}
            <div className="absolute w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] filter blur-2xl block rounded-full" style={{ background: 'radial-gradient(circle at center, #269DA9 0%, #0F0F0F 100%)' }}></div>
            {/* Imagem do app com efeito de transição */}
            <img 
              src={app} 
              alt="Aplicativo mostrando restaurantes" 
              className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[300px] h-auto relative z-10 transition-transform duration-300 transform hover:-translate-y-2" 
            />
          </div>

          <div className="space-y-6 max-w-lg w-full lg:w-1/2 mt-16 lg:mt-4 text-center lg:text-left lg:transform lg:translate-x-[-30%]">
            <h1 className="text-[28px] lg:text-[48px] leading-tight">
              Quer evitar filas e pedir seu prato favorito em segundos? Converse com o <b>PoliEats!</b>
            </h1>
          </div>
        </div>


      </div>
        {/*ultimo texto*/}
        <div className="w-full mt-16 overflow-hidden relative h-[60px]">

          {/* texto desktop*/}
          <div className="hidden md:flex animate-marquee-track absolute whitespace-nowrap">
            <span className="text-5xl font-medium text-white px-4">
              Faça pedidos, verifique status e receba ofertas exclusivas. Tudo pelo chat!
            </span>
            <span className="text-5xl font-medium text-white px-4">
              Faça pedidos, verifique status e receba ofertas exclusivas. Tudo pelo chat!
            </span>
          </div>

          {/* texto mobile */}
          <div className="flex md:hidden justify-center items-center h-full px-4">
            <span className="text-xl font-medium text-white text-center">
              Faça pedidos pelo chat e receba ofertas exclusivas.
            </span>
          </div>

        </div>
    </div>
  );
}

export default LandingPage;
