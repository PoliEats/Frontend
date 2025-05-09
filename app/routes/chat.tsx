import { useEffect, useState } from "react";
import { Menu, Moon, Send } from "react-feather";
import { ChatBubble, ChatBubbleOptions } from "~/components/ChatBubble";
import { Drawer, DrawerContent, DrawerTopbar } from "~/components/Drawer";
import FilterOption from "~/components/FilterOption";
import MenuItem from "~/components/MenuItem";
import QuickMessage from "~/components/QuickMessage";
import { socket } from "~/functions/functions";

interface Option {
  label: string;
  onClick: () => void;
}

interface Message {
  message: string;
  sender: "user" | "bot";
  timestamp: string;
  options?: Option[];
  loading?: boolean;
}

interface TQuickMessage {
  title: string;
  message: string;
  disabled?: boolean;
  onClick?: () => void;
}

function Chat() {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const quickMessages: TQuickMessage[] = [
    {
      title: "Ver cardápio",
      message: "Ver cardápio",
      onClick: () =>
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: "Ver cardápio",
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          {
            message: "Aqui está o cardápio.",
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]),
    },
    {
      title: "Adicionar pizza",
      message: "Adicionar pizza",
      onClick: () =>
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: "Adicionar pizza",
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          {
            message: "Aqui está o cardápio de pizzas.",
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]),
    },
    {
      title: "Adicionar bebida",
      message: "Adicionar bebida",
      onClick: () =>
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: "Adicionar bebida",
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          {
            message: "Aqui está o cardápio de bebidas.",
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]),
    },
  ];

  useEffect(() => {
    // Scroll to the bottom of the chat container when a new message is added
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight -
        chatContainer.clientHeight;
    }
  }, [messages]);

  function newMessageHandler(value: any) {
    console.log(messages.length);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: value,
        sender: "bot",
        options: messages.length == 0 ? [{
          label: "Ver cardápio",
          onClick: () => {
            setIsMenuDrawerOpen(true);
          }
        }] : [],
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setIsLoading(false);
  }

  useEffect(() => {
    socket.on("message", newMessageHandler);
    return () => {
      socket.off("message", newMessageHandler);
    };
  }, []);

  const mockFilters = [
    {
      title: "Pizzas",
      onClick: () => {
        console.log("Pizzas");
      },
    },
    {
      title: "Bebidas",
      onClick: () => {
        console.log("Bebidas");
      },
    },
    {
      title: "Sobremesas",
      onClick: () => {
        console.log("Sobremesas");
      },
    },
    {
      title: "Acompanhamentos",
      onClick: () => {
        console.log("Acompanhamentos");
      },
    },
    {
      title: "Promoções",
      onClick: () => {
        console.log("Promoções");
      },
    },
  ]

  return (
    <main className="w-full h-svh xl:py-4">
      <Drawer isOpen={isMenuDrawerOpen} setIsOpen={setIsMenuDrawerOpen}>
        <DrawerContent>
          <DrawerTopbar>
            Cardápio
          </DrawerTopbar>
          <div className="w-full h-full flex flex-col gap-y-4 p-4">
            <input
              type="text"
              className="w-full h-10 bg-zinc-900 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#1F8B96] transition-all duration-300 text-sm"
              placeholder="Pesquise um item..."
            />
            <div className="w-full h-min flex flex-row gap-x-4 overflow-x-auto scroll-smooth scroll-m-0">
              {mockFilters.map((filter, index) => (
                <FilterOption key={index} title={filter.title} onClick={filter.onClick} />
              ))}
            </div>
            <div className="w-full h-full max-h-svh pb-18 p-4 overflow-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-auto gap-x-4 gap-y-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <div className="w-full h-full md:flex md:flex-row grid grid-rows-[8%_90%] bg-zinc-950 border-zinc-800 max-w-7xl mx-auto rounded-lg gap-4">
        <div className="w-full md:w-1/12 md:min-w-20 h-full bg-zinc-900 rounded-lg border-zinc-800 md:rounded-l-lg md:p-2 md:pb-8 md:pt-4 flex md:flex-col md:justify-between md:items-center flex-row justify-between items-center px-4 md:px-0">
          <img
            src="icon.png"
            alt="Logo"
            className="hidden md:block w-14 md:w-18 h-14 md:h-18"
          />
          <button className="md:hidden">
            <Menu />
          </button>
          <Moon
            size={24}
            className="hidden md:block cursor-pointer hover:text-[#1F8B96] transition-colors duration-300"
          />
        </div>
        <div className="w-full h-full flex flex-col justify-between p-2 md:p-4 gap-y-4 py-4">
          <div
            id="chat-container"
            className="w-full h-full overflow-y-auto scroll-smooth scroll-m-0"
          >
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                index={index}
                message={message.message}
                sender={message.sender}
                timestamp={message.timestamp}
              >
                {message.options && (
                  <ChatBubbleOptions
                    options={message.options}
                  />
                )}
              </ChatBubble>
            ))}
            {isLoading && (
              <ChatBubble
              message="..."
              sender="bot"
              loading={true} index={0} timestamp={""}
              />
            )}
          </div>
          {quickMessages.length > 0 && (
            <div className="w-full h-fit flex flex-col gap-y-2">
              <div className="w-full h-fit flex flex-row gap-x-2 overflow-x-auto scrollbar-hide">
                {quickMessages.map((quickMessage, index) => (
                  <div key={index} className="flex-shrink-0">
                    <QuickMessage
                      title={quickMessage.title}
                      message={quickMessage.message}
                      onClick={quickMessage.onClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <form onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();

            setMessages((prevMessages) => [
              ...prevMessages,
              {
                message: userInput,
                sender: "user",
                timestamp: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ]);
            setIsLoading(true);

            socket.emit("message", userInput);
          }} className="w-full h-fit flex flex-row gap-x-4 items-center justify-between">
            <input
              type="text"
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              className="w-full h-10 bg-zinc-900 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#1F8B96] transition-all duration-300 text-sm"
              placeholder="Digite sua mensagem aqui..."
            />
            <button
              type="submit"
              className="w-fit min-w-10 min-h-10 flex items-center justify-center md:px-6 h-full bg-[#15747f] hover:bg-[#1F8B96] duration-300 cursor-pointer rounded-full md:rounded-lg transition-all"
            >
              <span className="hidden md:block">Enviar</span>
              <Send className="md:hidden" size={16} />
            </button>
          </form>
          <small className="text-gray-500 text-xs text-center">
            Copyright © 2025 PoliEats. All rights reserved.
          </small>
        </div>
      </div>
    </main>
  );
}

export default Chat;
