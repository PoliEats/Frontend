import { useEffect, useState } from "react";
import { Moon, Send } from "react-feather";
import { ChatBubble, ChatBubbleOptions } from "~/components/ChatBubble";
import QuickMessage from "~/components/QuickMessage";

interface Message {
    message: string;
    sender: 'user' | 'bot';
    timestamp: string;
    options?: string[];
}

interface TQuickMessage {
    title: string;
    message: string;
    disabled?: boolean;
    onClick?: () => void;
}

function Chat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            message: "Olá, como posso te ajudar ?",
            sender: "bot",
            timestamp: "10:00 AM",
        },
        {
            message: "Oi, gostaria de ver o cardápio.",
            sender: "user",
            timestamp: "10:01 AM",
        },
        {
            message: "Claro! Aqui está o cardápio.",
            sender: "bot",
            timestamp: "10:02 AM",
        },
        {
            message: "Você gostaria de adicionar algo ao seu pedido?",
            sender: "bot",
            timestamp: "10:03 AM",
            options: ["Adicionar pizza", "Adicionar bebida"],
        },
        // Really big message to test the scroll
        {
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            sender: "bot",
            timestamp: "10:04 AM",
        },
        {
            message: "Sim, gostaria de adicionar uma pizza.",
            sender: "user",
            timestamp: "10:05 AM",
        },
        {
            message: "Ótimo! Aqui está o cardápio de pizzas.",
            sender: "bot",
            timestamp: "10:06 AM",
        },
    ]);

    const quickMessages: TQuickMessage[] = [
        { title: "Ver cardápio", message: "Ver cardápio", onClick: () => setMessages((prevMessages) => [
            ...prevMessages,
            {
                message: "Ver cardápio",
                sender: "user",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
            {
                message: "Aqui está o cardápio.",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
        ]) },
        { title: "Adicionar pizza", message: "Adicionar pizza", onClick: () => setMessages((prevMessages) => [
            ...prevMessages,
            {
                message: "Adicionar pizza",
                sender: "user",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
            {
                message: "Aqui está o cardápio de pizzas.",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
        ]) },
        { title: "Adicionar bebida", message: "Adicionar bebida", onClick: () => setMessages((prevMessages) => [
            ...prevMessages,
            {
                message: "Adicionar bebida",
                sender: "user",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
            {
                message: "Aqui está o cardápio de bebidas.",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
        ]) },
    ];

  useEffect(() => {
    // Scroll to the bottom of the chat container when a new message is added
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight;
    }
  }, [messages])

  return (
    <main className="w-full h-svh xl:py-4">
        <div className="w-full h-full md:flex md:flex-row grid grid-rows-[8%_90%] bg-zinc-950 xl:border border-zinc-800 max-w-7xl mx-auto rounded-lg">
            <div className="w-full md:w-1/12 md:min-w-20 h-full md:border-r md:border-b-0 border-b border-zinc-800 md:rounded-l-lg md:p-2 md:pb-8 md:pt-4 flex md:flex-col md:justify-between md:items-center flex-row justify-between items-center px-4 md:px-0">
                <img src="icon.png" alt="Logo" className="w-14 md:w-18 h-14 md:h-18" />
                <Moon size={24} className="cursor-pointer hover:text-[#1F8B96] transition-colors duration-300"/>
            </div>
            <div className="w-full h-full flex flex-col justify-between p-2 md:p-4 gap-y-4 py-4">
                <div id="chat-container" className="w-full h-full overflow-y-auto scroll-smooth scroll-m-0">
                    {messages.map((message, index) => (
                        <ChatBubble key={index} index={index} message={message.message} sender={message.sender} timestamp={message.timestamp}>
                            {message.options && (
                                <ChatBubbleOptions options={message.options} onSelect={(option) => {
                                    setMessages((prevMessages) => [
                                        ...prevMessages,
                                        {
                                            message: option,
                                            sender: "user",
                                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                        },
                                        {
                                            message: `Você selecionou: ${option}`,
                                            sender: "bot",
                                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                        },
                                    ]);
                                }} />
                            )}
                        </ChatBubble>
                    ))}
                </div>
                {quickMessages.length > 0 && (
                    <div className="w-full h-fit flex flex-col gap-y-2">
                        <div className="w-full h-fit flex flex-row gap-x-2 overflow-x-auto scrollbar-hide">
                            {quickMessages.map((quickMessage, index) => (
                                <div key={index} className="flex-shrink-0">
                                    <QuickMessage title={quickMessage.title} message={quickMessage.message} onClick={quickMessage.onClick} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="w-full h-fit flex flex-row gap-x-4 items-center justify-between">
                    <input type="text" className="w-full h-10 bg-zinc-900 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#1F8B96] transition-all duration-300 text-sm" placeholder="Digite sua mensagem aqui..." />
                    <button className="w-fit min-w-10 min-h-10 flex items-center justify-center md:px-6 h-full bg-[#15747f] hover:bg-[#1F8B96] duration-300 cursor-pointer rounded-full md:rounded-lg transition-all" onClick={() => {
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            {
                                message: "Mensagem enviada",
                                sender: "user",
                                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            },
                            {
                                message: "Mensagem recebida",
                                sender: "bot",
                                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            },
                        ]);
                    }}>
                        <span className="hidden md:block">Enviar</span>
                        <Send className="md:hidden" size={16}/>
                    </button>
                </div>
                <small className="text-gray-500 text-xs text-center">
                    Copyright © 2025 PoliEats. All rights reserved.
                </small>
            </div>
        </div>
    </main>
  )
}

export default Chat