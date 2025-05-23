import axios from 'axios'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Book, Menu, Send, X } from 'react-feather'
import { ChatBubble, ChatBubbleOptions } from '~/components/ChatBubble'
import DarkModeToggle from '~/components/DarkModeToggle'
import { Drawer, DrawerContent, DrawerTopbar } from '~/components/Drawer'
import FilterOption from '~/components/FilterOption'
import MenuItem from '~/components/MenuItem'
import { Modal, ModalContent } from '~/components/Modal'
import QuickMessage from '~/components/QuickMessage'
import Skeleton from '~/components/Skeleton'
import { socket } from '~/functions/functions'
import type { Message, Order, TQuickMessage } from '~/functions/interfaces'

function DrawerMenu() {
  const mockItems = [
    {
      image:
        'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Filé de frango',
      price: 25,
      description: 'Delicioso filé de frango grelhado com temperos especiais.',
      category: 'Prato Principal',
    },
    {
      image:
        'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Filé de peixe',
      price: 30,
      description: 'Delicioso filé de peixe grelhado com temperos especiais.',
      category: 'Prato Principal',
    },
    {
      image:
        'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'X-Burguer',
      price: 20,
      description: 'Delicioso X-Burguer com queijo, alface e tomate.',
      category: 'Lanches',
    },
    {
      image:
        'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Batata frita',
      price: 10,
      description: 'Deliciosa batata frita crocante.',
      category: 'Acompanhamentos',
    },
  ]

  const [nameFilter, setNameFilter] = useState('')
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState<string[]>([])
  const [displayedItems, setDisplayedItems] = useState(mockItems)

  const mockFilters = [
    {
      title: 'Pizzas',
      onClick: () => {
        console.log('Pizzas')
      },
    },
    {
      title: 'Bebidas',
      onClick: () => {
        console.log('Bebidas')
      },
    },
    {
      title: 'Acompanhamentos',
      onClick: () => {
        console.log('Acompanhamentos')
      },
    },
    {
      title: 'Prato Principal',
      onClick: () => {
        console.log('Prato Principal')
      },
    },
    {
      title: 'Lanches',
      onClick: () => {
        console.log('Lanches')
      },
    },
  ]

  useEffect(() => {
    const filteredItems = mockItems.filter((item) => {
      return (
        item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        (categoryFilter.length === 0 || categoryFilter.includes(item.category))
      )
    })

    setDisplayedItems(filteredItems)
  }, [nameFilter, categoryFilter])

  async function fetchData() {
    await axios.get('http://localhost:8000/products').then((res) => {
      const data = res.data.data
      setDisplayedItems(data.map((item: any) => ({
        ...item,
        image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      })
    ))
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoadingData(false)
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-y-4 p-4">
      <input
        onChange={(e) => {
          setNameFilter(e.target.value)
        }}
        type="text"
        className="w-full h-10 bg-background-900 rounded-lg px-4 focus:outline-none focus:ring-2 text-text-50 focus:ring-accent-500 transition-all duration-300 text-sm text-text-50"
        placeholder="Pesquise um item..."
      />
      <div className="w-full h-fit min-h-16 flex flex-row gap-x-4 overflow-auto scroll-smooth scroll-m-0">
        {mockFilters.map((filter, index) => (
          <FilterOption
            key={index}
            title={filter.title}
            onClick={() => {
              categoryFilter.includes(filter.title)
                ? setCategoryFilter(
                    categoryFilter.filter((item) => item !== filter.title)
                  )
                : setCategoryFilter([...categoryFilter, filter.title])
            }}
            isSelected={categoryFilter.includes(filter.title)}
          />
        ))}
      </div>
      <Skeleton isLoading={isLoadingData} className="w-full h-full max-h-svh pb-18 p-4 overflow-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-auto gap-x-4 gap-y-4">
          <AnimatePresence>
            {displayedItems.map((item, index) => (
              <MenuItem
                key={index}
                image={item.image}
                name={item.name}
                price={item.price}
                description={item.description}
                category={item.category}
              />
            ))}
          </AnimatePresence>
        </div>
      </Skeleton>
    </div>
  )
}

function Chat() {
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newOrder, setNewOrder] = useState<Order>()

  const quickMessages: TQuickMessage[] = [
    {
      title: 'Ver cardápio',
      message: 'Ver cardápio',
      onClick: () =>
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: 'Ver cardápio',
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
          {
            message: 'Aqui está o cardápio.',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]),
    },
    {
      title: 'Adicionar pizza',
      message: 'Adicionar pizza',
      onClick: () =>
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: 'Adicionar pizza',
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
          {
            message: 'Aqui está o cardápio de pizzas.',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]),
    },
    {
      title: 'Adicionar bebida',
      message: 'Adicionar bebida',
      onClick: () =>
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: 'Adicionar bebida',
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
          {
            message: 'Aqui está o cardápio de bebidas.',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]),
    },
  ]

  useEffect(() => {
    // Scroll to the bottom of the chat container when a new message is added
    const chatContainer = document.getElementById('chat-container')
    if (chatContainer) {
      chatContainer.scrollTop =
        chatContainer.scrollHeight - chatContainer.clientHeight
    }
  }, [messages])

  function orderConfirmation({ confirm }: { confirm: boolean }) {
    if (confirm) {
      socket.emit(
        'order_confirmation',
        JSON.stringify({ orderId: newOrder?.id, type: 'confirm' })
      )
    } else {
      socket.emit(
        'order_confirmation',
        JSON.stringify({ orderId: newOrder?.id, type: 'cancel' })
      )
    }
  }

  function newMessageHandler(message: string) {
    const newMessage: {
      type: string
      message: string
      order?: Order
    } = JSON.parse(message)

    console.log(newMessage)

    if (newMessage.type == 'order') {
      setNewOrder(newMessage.order)
      setIsModalOpen(true)
      return
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: newMessage.message,
        sender: 'bot',
        options:
          newMessage.type == 'welcome'
            ? [
                {
                  label: 'Ver cardápio',
                  onClick: () => {
                    setIsMenuDrawerOpen(true)
                  },
                },
              ]
            : undefined,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ])
    setIsLoading(false)
  }

  useEffect(() => {
    socket.on('message', newMessageHandler)
    return () => {
      socket.off('message', newMessageHandler)
    }
  }, [])

  return (
    <main className="w-full h-svh xl:py-4">
      <Modal setOpen={setIsModalOpen} open={isModalOpen}>
        <ModalContent>
          <div className="w-full h-fit min-h-14 flex flex-row items-center">
            <X
              size={20}
              className="cursor-pointer hover:text-accent-500 text-text-50 transition-colors duration-300"
              onClick={() => {
                setIsModalOpen(false)
              }}
            />
            <p className="text-md font-bold text-zinc-200 ml-4">
              Confirmar pedido
            </p>
          </div>
          <div className="w-full h-full">
            <p className="text-sm text-zinc-500">Informações do pedido</p>
            <div className="w-full h-full flex flex-col gap-y-4 overflow-auto scroll-smooth scroll-m-0 py-4">
              {newOrder?.items.map((item) => (
                <div className="flex flex-row items-center justify-between w-full">
                  <div>
                    <p className="text-sm text-text-50">
                      {item.quantity}x - {item.name}
                    </p>
                    {item.observation && (
                      <p className="text-xs text-zinc-500">
                        Observações: {item.observation}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500">
                    {item.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <hr className="text-zinc-500" />
          <div className="text-text-50 w-full h-fit min-h-12 flex flex-row items-center justify-between font-bold">
            <p className="text-sm">Total</p>
            <p className="text-sm">
              {newOrder?.total.toLocaleString('pt-BR', {
                currency: 'BRL',
                style: 'currency',
              })}
            </p>
          </div>
          <div className="w-full h-fit flex flex-row items-center justify-end gap-x-2">
            <button
              onClick={() => {
                orderConfirmation({ confirm: false })
                setIsModalOpen(false)
              }}
              className="bg-secondary-500 text-sm text-text-50 p-4 py-2 hover:bg-secondary-600 duration-300 cursor-pointer rounded-lg transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                orderConfirmation({ confirm: true })
                setIsModalOpen(false)
              }}
              className="bg-accent-600 text-text-50 text-sm p-4 py-2 hover:bg-accent-500 duration-300 cursor-pointer rounded-lg transition-all"
            >
              Confirmar
            </button>
          </div>
        </ModalContent>
      </Modal>
      <Drawer isOpen={isMenuDrawerOpen} setIsOpen={setIsMenuDrawerOpen}>
        <DrawerContent>
          <DrawerTopbar>Cardápio</DrawerTopbar>
          <DrawerMenu />
        </DrawerContent>
      </Drawer>
      <div className="w-full h-full md:flex md:flex-row grid grid-rows-[8%_90%] bg-background-900 border-secondary-500 max-w-7xl mx-auto rounded-lg gap-4">
        <div className="w-full md:w-1/12 md:min-w-20 h-full bg-background-950 rounded-lg border-secondary-500 md:rounded-l-lg md:p-2 md:pb-8 md:pt-4 flex md:flex-col md:justify-between md:items-center flex-row justify-between items-center px-4 md:px-0">
          <img
            src="icon.png"
            alt="Logo"
            className="hidden md:block w-14 md:w-18 h-14 md:h-18"
          />
          <button className="md:hidden">
            <Menu />
          </button>
          <div className="hidden md:flex flex-col gap-y-8 text-text-200">
            <button
              onClick={() => {
                setIsMenuDrawerOpen(true)
              }}
              className='className="hidden md:block cursor-pointer hover:text-accent-500 transition-colors duration-300'
            >
              <Book size={24} />
            </button>
            <DarkModeToggle />
          </div>
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
                  <ChatBubbleOptions options={message.options} />
                )}
              </ChatBubble>
            ))}
            {isLoading && (
              <ChatBubble
                message="..."
                sender="bot"
                loading={true}
                index={0}
                timestamp={''}
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
          <form
            onSubmit={(e) => {
              e.stopPropagation()
              e.preventDefault()

              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  message: userInput,
                  sender: 'user',
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                },
              ])
              setIsLoading(true)

              socket.emit('message', userInput)

              setUserInput('')
            }}
            className="w-full h-fit flex flex-row gap-x-4 items-center justify-between"
          >
            <input
              type="text"
              onChange={(e) => {
                setUserInput(e.target.value)
              }}
              className="w-full h-10 bg-background-950 rounded-lg px-4 focus:outline-none focus:ring-2 text-text-200 focus:ring-accent-500 transition-all duration-300 text-sm"
              placeholder="Digite sua mensagem aqui..."
            />
            <button
              type="submit"
              className="w-fit min-w-10 min-h-10 flex items-center justify-center md:px-6 h-full bg-primary-500 hover:bg-primary-600 duration-300 cursor-pointer rounded-full md:rounded-lg transition-all"
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
  )
}

export default Chat
