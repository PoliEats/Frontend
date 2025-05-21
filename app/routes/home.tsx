import React from 'react';
import celular from '../assets/celular.png';
import app from '../assets/app.png';
import Poliedro from '../assets/Poliedro.png';
import PoliEats from '../assets/PoliEats.png';
import IMT from '../assets/IMT.png';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="flex flex-col gap-24 px-6 lg:px-20 font-lato mt-12 bg-[#0F0F0F]">

        {/* primeiro bloco: título e imagem */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="space-y-6 max-w-lg w-full lg:w-1/2">
            <h1 className="text-[36px] lg:text-[50px] leading-tight">
              <b>PoliEats</b> – Peça, Consulte e Descubra com um Toque!
            </h1>
            <button className="hidden lg:inline-block cursor-pointer px-8 py-4 bg-[#1EB4C3] hover:bg-[#17a0ad] rounded-lg text-lg font-semibold transition transform hover:scale-105 duration-300">
              Faça seu pedido!
            </button>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 relative flex justify-center items-center">
            <div
              className="absolute w-[700px] h-[700px] rounded-full z-0 filter blur-2xl lg:block hidden"
              style={{ background: 'radial-gradient(circle at center, #269DA9 0%, #0F0F0F 100%)' }}
            ></div>
            <img
              src={celular}
              alt="Ilustração do aplicativo"
              className="w-[550px] h-auto relative z-10 transition-transform duration-300 transform hover:-translate-y-2"
            />
          </div>
        </div>

        <div className="w-full lg:hidden flex justify-start pl-6 mt-8">
          <button className="cursor-pointer px-8 py-4 bg-[#1EB4C3] hover:bg-[#17a0ad] rounded-lg text-lg font-semibold transition transform hover:scale-105 duration-300">
            Faça seu pedido!
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mt-8 lg:mt-4 relative flex justify-center items-center">
            <div className="absolute w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] filter blur-2xl block rounded-full"
              style={{ background: 'radial-gradient(circle at center, #269DA9 0%, #0F0F0F 100%)' }}
            ></div>
            <img
              src={app}
              alt="Aplicativo mostrando restaurantes"
              className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[300px] h-auto relative z-10 transition-transform duration-300 transform hover:-translate-y-2"
            />
          </div>

          <div className="space-y-6 max-w-lg w-full lg:w-1/2 mt-16 lg:mt-4 text-center lg:text-left 2xl:transform 2xl:translate-x-[-30%]">
            <h1 className="text-[28px] lg:text-[34px] leading-tight">
              Quer evitar filas e pedir seu prato favorito em segundos? Converse com o <b>PoliEats!</b>
            </h1>
          </div>

        </div>
      </div>

      <div className="w-full mt-48 hidden lg:block overflow-hidden relative h-[60px]">
        <div className="animate-marquee-track absolute whitespace-nowrap">
          <span className="text-5xl font-medium text-white inline-block mx-8">
            Faça pedidos, verifique status e receba ofertas exclusivas. Tudo pelo chat!
          </span>
          <span className="text-5xl font-medium text-white inline-block mx-8">
            Faça pedidos, verifique status e receba ofertas exclusivas. Tudo pelo chat!
          </span>
        </div>
      </div>

      <div className="flex lg:hidden justify-center items-center h-full px-4 mt-12">
        <span className="text-xl font-medium text-white text-center">
          Faça pedidos pelo chat e receba ofertas exclusivas.
        </span>
      </div>

      <div className="relative mt-18">
        <svg viewBox="0 0 1440 150" className="w-full h-[100px] lg:h-[120px]" preserveAspectRatio="none">
          <path fill="#1EB4C3" className="block lg:hidden" d="M0,100 C480,50 960,150 1440,100 L1440,150 L0,150 Z" />
          <path fill="#1EB4C3" className="hidden lg:block" d="M0,100 C480,-50 960,250 1440,100 L1440,150 L0,150 Z" />
        </svg>
      </div>

      <div className="bg-[#1EB4C3] text-[#0f0f0f] text-center py-8">
        <h1 className="text-[36px] lg:text-[64px]"><b>Parceiros</b></h1>
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:justify-center md:gap-32">
          <img src={Poliedro} alt="Parceiro 1" className="w-60 h-60 object-contain mx-16 transition-transform duration-300 transform hover:-translate-y-2" />
          <img src={PoliEats} alt="Parceiro 3" className="w-48 h-48 object-contain mx-16 transition-transform duration-300 transform hover:-translate-y-2" />
          <img src={IMT} alt="Parceiro 2" className="w-48 h-48 object-contain mx-16 transition-transform duration-300 transform hover:-translate-y-2" />
        </div>
      </div>

      <div className="bg-[#1EB4C3] text-[#0f0f0f] py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-12 px-6 lg:px-32 text-lg lg:text-xl">
          <div className="bg-white/20 rounded-2xl p-8 backdrop-blur-md w-full lg:w-1/2 space-y-6 shadow-lg transition-transform duration-300 transform hover:-translate-y-2">
            <h2 className="text-3xl font-bold ">Horário de Atendimento</h2>
            <p>Segunda a sexta, das <b>8h às 18h</b></p>
            <p>Entre em contato pelo WhatsApp para mais informações.</p>
            <div className="w-full h-64 rounded-xl overflow-hidden ">
              <iframe
                title="Mapa Local"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.5740700593893!2d-46.639343424694725!3d-23.585441762453816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59b7793923ef%3A0x4fc5f0218f199f3e!2sCol%C3%A9gio%20Poliedro%20-%20Unidade%20Vila%20Mariana!5e0!3m2!1spt-BR!2sbr!4v1715520954737!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="bg-white/20 rounded-2xl p-8 backdrop-blur-md w-full lg:w-1/2 space-y-6 shadow-lg transition-transform duration-300 transform hover:-translate-y-2">
            <h2 className="text-3xl font-bold">Contato</h2>
            <p>Restaurante Poliedro – CNPJ XX.XXX.XXX/0001-XX</p>
            <p>restaurantepoli@gmail.com</p>
            <p>
              Rua do Poliedro – número<br />
              Bairro – São Paulo – SP
            </p>
            <div className="flex gap-6 mt-6 text-3xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://wa.me/55119XXXX-XXXX" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            </div>
          </div>
        </div>
        <div className="bg-[#17a0ad] py-4 text-center text-base text-[#0f0f0f] font-medium shadow-inner border-t border-[#0f0f0f]/10 mt-12">
          © 2025 PoliEats – Todos os direitos reservados.
        </div>
      </div>

    </div>
  );
}

export default LandingPage;
