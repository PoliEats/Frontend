import axios from "axios"
import { useEffect, useState } from "react"
import { Bell, DollarSign, TrendingUp } from "react-feather"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import Skeleton from "~/components/Skeleton"

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
    const [companyStats, setCompanyStats] = useState({
      orderCount: 0,
      productCount: 0,
      monthlyRevenue: 0,
      mostOrderedProduct: '',
    })

    async function fetchCompanyStats() {
      setIsLoading(true)
      await axios.get('http://localhost:8000/company', {
        withCredentials: true,
      }).then((response) => {
        console.log('Company stats:', response.data)
        setCompanyStats(response.data.data)
      }).catch((error) => {
        console.error('Error fetching company stats:', error)
      }).finally(() => {
        setIsLoading(false)
      })
    }

    useEffect(() => {
      fetchCompanyStats()
    }, [])

  return (
    <div className="w-full h-full rounded-lg flex flex-col gap-y-4 overflow-y-auto">
        <div className="h-fit grid grid-rows-4 grid-cols-none md:grid-cols-4 md:grid-rows-none md:gap-x-4 gap-y-4 md:gap-y-0">
            <Skeleton
            isLoading={isLoading}
            className="w-full h-full min-h-32 md:min-h-fit bg-accent-700 rounded-sm flex flex-col justify-between p-4 gap-y-4"
          >
            <div className="flex w-full h-fit justify-between">
              <p className="text-sm text-text-50">Receita mensal</p>
              <DollarSign size={20} className="text-text-50" />
            </div>
            <p className="font-bold text-xl text-text-50">
              {companyStats.monthlyRevenue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }) ?? 0}
            </p>
            <div className="flex w-fit h-fit gap-x-4 items-center text-accent-50">
              <TrendingUp size={20} />
            </div>
          </Skeleton>
            <Skeleton
            isLoading={isLoading}
            className="w-full h-full min-h-32 md:min-h-fit bg-accent-700 rounded-sm flex flex-col justify-between p-4 gap-y-4"
          >
            <div className="flex w-full h-fit justify-between">
              <p className="text-sm text-text-50">Número de pedidos</p>
              <DollarSign size={20} className="text-text-50" />
            </div>
            <p className="font-bold text-xl text-text-50">
              {companyStats.orderCount ?? 0}
            </p>
            <div className="flex w-fit h-fit gap-x-4 items-center text-accent-50">
              <TrendingUp size={20} />
            </div>
          </Skeleton>
            <Skeleton
            isLoading={isLoading}
            className="w-full h-full min-h-32 md:min-h-fit bg-accent-700 rounded-sm flex flex-col justify-between p-4 gap-y-4"
          >
            <div className="flex w-full h-fit justify-between">
              <p className="text-sm text-text-50">Número de produtos</p>
              <DollarSign size={20} className="text-text-50" />
            </div>
            <p className="font-bold text-xl text-text-50">
              {companyStats.productCount ?? 0}
            </p>
            <div className="flex w-fit h-fit gap-x-4 items-center text-accent-50">
              <TrendingUp size={20} />
            </div>
          </Skeleton>
            <Skeleton
            isLoading={isLoading}
            className="w-full h-full min-h-32 md:min-h-fit bg-accent-700 rounded-sm flex flex-col justify-between p-4 gap-y-4"
          >
            <div className="flex w-full h-fit justify-between">
              <p className="text-sm text-text-50">Produto mais pedido</p>
              <DollarSign size={20} className="text-text-50" />
            </div>
            <p className="font-bold text-xl text-text-50">
              {companyStats.mostOrderedProduct ?? 'Nenhum'}
            </p>
            <div className="flex w-fit h-fit gap-x-4 items-center text-accent-50">
              <TrendingUp size={20} />
            </div>
          </Skeleton>
        </div>
        <div className="w-full h-full md:grid md:grid-cols-[65%_auto] flex flex-col md:gap-x-4 gap-y-4">
          <Skeleton
            isLoading={isLoading}
            className="w-full h-96 md:min-h-full rounded-sm bg-background-950 flex flex-col gap-y-4 p-4 justify-between"
          >
            <div className="flex w-full h-fit justify-between">
              <p className="text-sm text-text-50">
                Relação receita x mês
              </p>
              <TrendingUp size={20} className="text-text-50" />
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                    { name: 'Janeiro', value: 4000 },
                    { name: 'Fevereiro', value: 3000 },
                    { name: 'Março', value: 2000 },
                    { name: 'Abril', value: 2780 },
                    { name: 'Maio', value: 1890 },
                    { name: 'Junho', value: 2390 },
                    { name: 'Julho', value: 3490 },
                ]}
                margin={{
                  top: 10,
                  right: 5,
                  left: 5,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  wrapperStyle={{
                    padding: '8px',
                  }}
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '4px',
                    padding: '8px',
                    borderColor: 'transparent',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#107d89"
                  radius={4}
                  activeBar={isLoading}
                />
              </BarChart>
            </ResponsiveContainer>
          </Skeleton>
          <Skeleton
            isLoading={isLoading}
            className="w-full h-full min-h-92 md:min-h-fit rounded-sm bg-background-950 p-4 flex flex-col overflow-y-auto gap-y-4"
          >
            <div className="flex w-full h-fit justify-between">
              <p className="text-sm text-text-50">Notificações</p>
              <Bell size={20} className="text-text-50" />
            </div>
            {/* {tenantPayments.length > 0 ? (
              tenantPayments.map((payment) => (
                <div className="flex items-center justify-between flex-row">
                  <div className="flex items-center gap-x-2">
                    <DollarSign />
                    <div>
                      <h4 className="text-sm">Pagamento recebido</h4>
                      <p className="text-xs italic">
                        {payment.tenant_contract.type} -{' '}
                        {payment.tenant_contract.room}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold">
                    +
                    {payment.tenant_contract_payment.value.toLocaleString(
                      'pt-BR',
                      {
                        style: 'currency',
                        currency: 'BRL',
                      }
                    )}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-700">
                Nenhum pagamento encontrado.
              </p>
            )} */}
          </Skeleton>
        </div>
    </div>
  )
}

export default Dashboard