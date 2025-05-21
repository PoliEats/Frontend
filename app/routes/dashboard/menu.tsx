import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type ColumnFiltersState, type PaginationState } from "@tanstack/react-table"
import { useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "react-feather"
import { Modal, ModalContent } from "~/components/Modal"
import Skeleton from "~/components/Skeleton"
import { defaultMenuColumns } from "~/functions/tables.tsx"
import { type TProduct } from "~/functions/types"

function PaginationButton({ onClick, disabled, className, children }: { onClick: () => void, disabled?: boolean, className?: string, children: ReactNode }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            {children}
        </button>
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
        }
    ])
    const [data,setData] = useState<TProduct[]>([
        {
            id: "1",
            name: "Pizza de Calabresa",
            description: "Pizza de calabresa com cebola e azeitona",
            price: 29.90,
            type: "pizza",
            isAvailable: true
        }
    ])

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
        }
    })

  return (
    <div className="flex flex-col items-start justify-center h-full gap-y-4 py-4">
        <Modal setOpen={() => {
            setIsAddingItem(false)
        }} open={isAddingItem}>
            <ModalContent>
                <div className="flex flex-col items-start justify-center h-full gap-y-4">
                    <h1 className="text-3xl font-bold text-text-100">Adicionar item</h1>
                    <div className="flex flex-col items-start justify-center w-full gap-y-4">
                        <input type="text" placeholder="Nome" className="w-full text-sm bg-background-800 text-text-50 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300" />
                        <input type="text" placeholder="Descrição" className="w-full text-sm bg-background-800 text-text-50 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300" />
                        <input type="text" placeholder="Preço" className="w-full text-sm bg-background-800 text-text-50 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300" />
                        <input type="text" placeholder="Tipo" className="w-full text-sm bg-background-800 text-text-50 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300" />
                    </div>
                    <div className="flex items-center justify-end w-full gap-x-4">
                        <button className="px-4 py-2 bg-background-800 rounded-sm text-sm cursor-pointer hover:bg-background-700 transition-colors duration-300">Cancelar</button>
                        <button className="px-4 py-2 bg-primary-500 rounded-sm text-sm cursor-pointer hover:bg-primary-400 transition-colors duration-300">Adicionar</button>
                    </div>
                </div>
            </ModalContent>
        </Modal>
        <div className="flex justify-between w-full">
            <h1 className="text-3xl font-bold text-text-100">Cardápio</h1>
            <button className="px-4 py-2 bg-primary-500 rounded-sm text-sm cursor-pointer hover:bg-primary-400 transition-colors duration-300" onClick={() => {
                setIsAddingItem(true)
            }}>Adicionar item</button>
        </div>
        <div className="flex items-center justify-between w-full">
            <input type="text" placeholder="Pesquisar por nome" className="w-72 text-sm bg-background-950 text-text-50 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300" value={table.getColumn('name')?.getFilterValue() as string} onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)} />
        </div>
        <Skeleton isLoading={false} className="w-full h-full bg-background-950 rounded-sm p-4 overflow-auto">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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