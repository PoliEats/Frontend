import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnFiltersState,
  type PaginationState,
} from '@tanstack/react-table'
import { useState, type ReactNode } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'react-feather'
import { useForm, type RegisterOptions } from 'react-hook-form'
import { Modal, ModalContent } from '~/components/Modal'
import Skeleton from '~/components/Skeleton'
import { defaultMenuColumns } from '~/functions/tables.tsx'
import { type TProduct } from '~/functions/types'

function PaginationButton({
  onClick,
  disabled,
  className,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {children}
    </button>
  )
}

function Input({
  label,
  type,
  id,
  register,
  register_options,
  placeholder,
  onChange,
  hint,
  error,
}: {
  label: string
  type: string
  id: string
  register: any
  hint?: string
  placeholder?: string
  register_options?: RegisterOptions
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-sm font-normal text-text-500">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        {...register(id, { ...register_options })}
        className="p-2 bg-background-900 h-10 min-w-72 text-sm text-text-50 rounded-sm outline-none focus:ring-2 transition-all duration-200 ring-accent-500"
      />
      {hint && <span className="text-xs text-text-500">{hint}</span>}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
}

function Menu() {
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 16,
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: 'name',
      value: '',
    },
  ])
  const [data, setData] = useState<TProduct[]>([
    {
      id: '1',
      name: 'Pizza de Calabresa',
      description: 'Pizza de calabresa com cebola e azeitona',
      price: 29.9,
      type: 'pizza',
      isAvailable: true,
    },
  ])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProduct>()

  const onSubmit = (data: TProduct) => {
    data.isAvailable = true
    setData((prev) => [...prev, data])
    setIsAddingItem(false)

    // TODO: Add API call to add item to database using Axios
  }

  const table = useReactTable({
    columns: defaultMenuColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    rowCount: data.length,
    state: {
      pagination: pagination,
      columnFilters: columnFilters,
    },
  })

  return (
    <div className="flex flex-col items-start justify-center h-full gap-y-4 py-4">
      <Modal
        setOpen={() => {
          setIsAddingItem(false)
        }}
        open={isAddingItem}
      >
        <ModalContent>
          <form
            className="flex flex-col items-start justify-between w-full h-full pt-4 gap-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-2xl font-bold text-text-100">Adicionar item</h1>
            <div className="w-full h-full flex flex-col items-start justify-start gap-y-4">
              <Input
                label="Nome do item"
                type="text"
                id="name"
                register={register}
                register_options={{ required: true }}
                placeholder="Nome do item"
                error={errors.name?.message}
              />
              <Input
                label="Descrição"
                type="text"
                id="description"
                register={register}
                register_options={{ required: true }}
                placeholder="Descrição"
                error={errors.description?.message}
              />
              <Input
                label="Preço"
                type="string"
                id="price"
                register={register}
                register_options={{ required: true, valueAsNumber: true }}
                placeholder="Preço"
                hint='Digite o preço com "." (ex: 29.90)'
                error={errors.price?.message}
              />
              <Input
                label="Tipo"
                type="text"
                id="type"
                register={register}
                register_options={{ required: true }}
                placeholder="Tipo"
                error={errors.type?.message}
              />
            </div>
            <div className="w-full h-fit flex items-center justify-end gap-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 rounded-sm text-sm cursor-pointer hover:bg-primary-400 transition-colors duration-300"
                onClick={() => {
                  setIsAddingItem(false)
                }}
              >
                Adicionar
              </button>
              <button
                className="px-4 py-2 bg-background-800 rounded-sm text-sm cursor-pointer hover:bg-background-700 transition-colors duration-300"
                onClick={() => {
                  setIsAddingItem(false)
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </ModalContent>
      </Modal>
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold text-text-100">Cardápio</h1>
        <button
          className="px-4 py-2 bg-primary-500 rounded-sm text-sm cursor-pointer hover:bg-primary-400 transition-colors duration-300"
          onClick={() => {
            setIsAddingItem(true)
          }}
        >
          Adicionar item
        </button>
      </div>
      <div className="flex items-center justify-between w-full">
        <input
          type="text"
          placeholder="Pesquisar por nome"
          className="w-72 text-sm bg-background-950 text-text-50 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
          value={table.getColumn('name')?.getFilterValue() as string}
          onChange={(e) =>
            table.getColumn('name')?.setFilterValue(e.target.value)
          }
        />
      </div>
      <Skeleton
        isLoading={false}
        className="w-full h-full bg-background-950 rounded-sm p-4 overflow-auto"
      >
        <table className="table-auto w-3xl md:w-full h-min overflow-x-auto">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="text-text-400">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-sm text-start">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-sm border-top border-t border-b border-background-800 text-text-50 py-2"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Skeleton>
      <div className="w-full h-fit flex items-center justify-end gap-x-2">
        <span className="text-sm mr-4 text-text-50">
          Página {table.getState().pagination.pageIndex + 1} de{' '}
          {table.getPageCount()}
        </span>
        <PaginationButton
          onClick={() => {
            table.firstPage()
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-background-50 text-text-50 rounded-lg"
        >
          <ChevronsLeft size={20} />
        </PaginationButton>
        <PaginationButton
          onClick={() => {
            table.previousPage()
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-background-50 text-text-50 rounded-lg"
        >
          <ChevronLeft size={20} />
        </PaginationButton>
        <PaginationButton
          onClick={() => {
            table.nextPage()
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-background-50 text-text-50 rounded-lg"
        >
          <ChevronRight size={20} />
        </PaginationButton>
        <PaginationButton
          onClick={() => {
            table.lastPage()
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-background-50 text-text-50 rounded-lg"
        >
          <ChevronsRight size={20} />
        </PaginationButton>
      </div>
    </div>
  )
}

export default Menu
