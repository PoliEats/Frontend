import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Modal, ModalContent } from '~/components/Modal'
import { socket } from '~/functions/functions'
import type { Order } from '~/functions/interfaces'

function KitchenScreen() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [confirmingReady, setConfirmingReady] = useState<boolean>(false)
  const [confirmingPayment, setConfirmingPayment] = useState<boolean>(false)
  const [pendingOrders, setPendingOrders] = useState<Order[]>([])
  const [completedOrders, setCompletedOrders] = useState<Order[]>([])
  const [paymentMethod, setPaymentMethod] = useState<string>('')

  function handleNewOrder(data: string) {
    let order: Order = JSON.parse(data).newOrder
    const notification = new Notification('Novo pedido', {
      body: `Pedido #${order.id} recebido!`,
      icon: '/icon.png',
    })
    notification.onclick = () => {
      window.focus()
    }

    setPendingOrders((prev) => {
      if (prev) {
        return [order, ...prev]
      } else {
        return [order]
      }
    })
  }

  async function setOrderPaid(order: Order) {
    setCompletedOrders((prev) => {
      if (prev) {
        return prev.filter((o) => o.id !== order.id)
      } else {
        return []
      }
    })

    //TODO: Send order to backend to mark as paid

    await axios
      .patch(`http://localhost:8000/orders/${order.id}`, {
        status: 'completed',
        paymentMethod: paymentMethod,
      })
      .then((res) => {
        const order = res.data.data
        setCompletedOrders((prev) => {
          if (prev) {
            return [order, ...prev]
          } else {
            return [order]
          }
        })
        toast.success('Pedido marcado como pago!');
      })
      .catch((err) => {
        console.log(err)
        toast.error('Erro ao marcar pedido como pago');
      })

    setConfirmingPayment(false)
  }

  async function setOrderReady(order: Order) {
    setPendingOrders((prev) => {
      if (prev) {
        return prev.filter((o) => o.id !== order.id)
      } else {
        return []
      }
    })
    setCompletedOrders((prev) => {
      if (prev) {
        return [order, ...prev]
      } else {
        return [order]
      }
    })

    //TODO: Send order to backend to mark as ready
    await axios
      .patch(`http://localhost:8000/orders/${order.id}`, {
        status: 'completed',
      })
      .then((res) => {
        const order = res.data.data
        setCompletedOrders((prev) => {
          if (prev) {
            return [order, ...prev]
          } else {
            return [order]
          }
        })
        toast.success('Pedido marcado como pronto!');
      })
      .catch((err) => {
        console.log(err)
        toast.error('Erro ao marcar pedido como pronto');
      })

    setConfirmingReady(false)
  }

  useEffect(() => {
    async function getNotification() {
      await Notification.requestPermission()
    }

    getNotification()

    socket.on('new_order', (data) => handleNewOrder(data))

    async function fetchOrders() {
      await axios.get('http://localhost:8000/orders').then((res) => {
        const orders = res.data.data
        const pendingOrders = orders.filter(
          (order: Order) => order.status === 'pending'
        )
        const completedOrders = orders.filter(
          (order: Order) => order.status === 'completed'
        )
        setPendingOrders(pendingOrders)
        setCompletedOrders(completedOrders)
      })
    }

    fetchOrders()

    return () => {
      socket.off('new_order', (data) => handleNewOrder(data))
    }
  }, [])

  return (
    <div className="flex flex-col items-start justify-center h-full gap-y-4 py-4">
      <Modal open={confirmingReady} setOpen={setConfirmingReady}>
        <ModalContent className="h-fit p-4 gap-y-2">
          <h1 className="text-2xl font-bold text-text-100">
            Marcar como pronto
          </h1>
          <p className="text-text-200">
            Tem certeza que deseja marcar esse pedido como pronto?
          </p>
          <small className="text-sm text-text-600">
            Essa ação não pode ser desfeita.
          </small>
          <div className="flex items-center justify-end w-full gap-x-4 mt-4">
            <button
              className="cursor-pointer bg-background-600 hover:bg-background-700 transition-colors duration-300 text-text-100 font-semibold py-2 px-4 rounded-lg text-sm"
              onClick={() => setConfirmingReady(false)}
            >
              Cancelar
            </button>
            <button
              className="cursor-pointer bg-primary-600 hover:bg-primary-700 transition-colors duration-300 text-text-100 font-semibold py-2 px-4 rounded-lg text-sm"
              onClick={() => {
                setOrderReady(selectedOrder!)
              }}
            >
              Pronto
            </button>
          </div>
        </ModalContent>
      </Modal>
      <Modal open={confirmingPayment} setOpen={setConfirmingPayment}>
        <ModalContent className="h-fit p-4 gap-y-4">
          <h1 className="text-2xl font-bold text-text-100">
            Confirmar pagamento
          </h1>
          <p className="text-text-600">
            Tem certeza que deseja marcar esse pedido como pago?
          </p>
          <div className="flex flex-col gap-y-2">
            <label className="text-text-200 text-sm" htmlFor="payment_method">
              Forma de pagamento:
            </label>
            <select
              id="payment_method"
              className="bg-background-800 text-text-100 w-full h-10 rounded-lg px-4"
              onChange={(e) => {
                setPaymentMethod(e.target.value)
              }}
              value={paymentMethod}
            >
              <option value="cash">Dinheiro</option>
              <option value="card">Cartão</option>
              <option value="pix">Pix</option>
              <option value="voucher">Vale-refeição</option>
            </select>
          </div>
          <small className="text-sm text-text-600">
            Essa ação não pode ser desfeita.
          </small>
          <div className="flex items-center justify-end w-full gap-x-4 mt-4">
            <button
              className="cursor-pointer bg-background-600 hover:bg-background-700 transition-colors duration-300 text-text-100 font-semibold py-2 px-4 rounded-lg text-sm"
              onClick={() => setConfirmingPayment(false)}
            >
              Cancelar
            </button>
            <button
              className="cursor-pointer bg-primary-600 hover:bg-primary-700 transition-colors duration-300 text-text-100 font-semibold py-2 px-4 rounded-lg text-sm"
              onClick={() => {
                setOrderPaid(selectedOrder!)
              }}
            >
              Confirmar
            </button>
          </div>
        </ModalContent>
      </Modal>
      <h1 className="text-3xl font-bold text-text-100">Pedidos</h1>
      <div className="w-full h-full">
        <p className="text-text-200">Pendentes:</p>
        <div className="h-fit min-h-82 w-full overflow-x-auto gap-x-4 flex flex-row py-4 px-2">
          <AnimatePresence>
            {pendingOrders.length > 0 ? (
              pendingOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  onClick={() => {
                    setSelectedOrder(order)
                    setConfirmingReady(true)
                  }}
                  className="bg-background-950 hover:bg-background-800 transition-colors cursor-pointer duration-300 w-96 min-w-96 max-h-96 h-fit rounded-lg shadow-md flex flex-col items-start justify-evenly p-4 gap-y-6"
                >
                  <div>
                    <h2 className="text-text-100 text-lg font-bold">
                      Pedido #{order.id}
                    </h2>
                    <p className="text-sm text-text-400">
                      Cliente: João da Silva
                    </p>
                    <p className="text-sm text-text-400">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-y-2 w-full">
                    {order.items.map((item) => (
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <p className="text-text-100 font-semibold">
                            {item.quantity}x - {item.name}
                          </p>
                          {item.observation && (
                            <p className="text-sm text-text-400">
                              Observação: {item.observation}
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-text-400">
                          {item.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between w-full border-t border-t-text-800 pt-4">
                    <p className="text-text-100 font-semibold">Total</p>
                    <p className="text-lg text-text-100">
                      {order.total.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="w-full min-h-min flex items-center justify-center">
                <h2 className="text-text-600 text-sm font-bold">
                  Nenhum pedido pendente
                </h2>
              </div>
            )}
          </AnimatePresence>
        </div>
        <hr className="my-4 text-text-800" />
        <p className="text-text-200">Concluídos:</p>
        <div className="h-fit min-h-82 w-full overflow-x-auto gap-x-4 flex flex-row py-4 px-2">
          <AnimatePresence>
            {completedOrders.length > 0 ? (
              completedOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  onClick={() => {
                    setSelectedOrder(order)
                    setConfirmingPayment(true)
                  }}
                  className="bg-background-950 hover:bg-background-800 transition-colors cursor-pointer duration-300 w-96 min-w-96 max-h-96 h-fit rounded-lg shadow-md flex flex-col items-start justify-evenly p-4 gap-y-6"
                >
                  <div>
                    <h2 className="text-text-100 text-lg font-bold">
                      Pedido #{order.id}
                    </h2>
                    <p className="text-sm text-text-400">
                      Cliente: João da Silva
                    </p>
                    <p className="text-sm text-text-400">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-y-2 w-full">
                    {order.items.map((item) => (
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <p className="text-text-100 font-semibold">
                            {item.quantity}x - {item.name}
                          </p>
                          {item.observation && (
                            <p className="text-sm text-text-400">
                              Observação: {item.observation}
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-text-400">
                          {item.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between w-full border-t border-t-text-800 pt-4">
                    <p className="text-text-100 font-semibold">Total</p>
                    <p className="text-lg text-text-100">
                      {order.total.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="w-full min-h-min flex items-center justify-center">
                <h2 className="text-text-600 text-sm font-bold">
                  Nenhum pedido concluído
                </h2>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default KitchenScreen
