import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router'
import type { TProduct } from './types'

// Menu table
const menuColumnHelper = createColumnHelper<TProduct>()

export const defaultMenuColumns = [
  menuColumnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  menuColumnHelper.accessor('name', {
    header: 'Nome',
    cell: (info) => (
      <Link
        to={`/dashboard/menu/${info.getValue()}`}
        className="hover:underline transition-all duration-300"
      >
        {info.getValue()}
      </Link>
    ),
  }),
  menuColumnHelper.accessor('description', {
    header: 'Descrição',
    cell: (info) => info.getValue(),
  }),
  menuColumnHelper.accessor('type', {
    header: 'Tipo',
    cell: (info) => (
      <div className="bg-text-50 text-background-950 w-fit px-4 text-xs py-1 rounded-sm">
        {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
      </div>
    ),
  }),
  menuColumnHelper.accessor('isAvailable', {
    header: 'Disponível',
    cell: (info) => (
      <div className="bg-text-50 text-background-950 w-fit px-4 text-xs py-1 rounded-sm">
        {info.getValue() ? 'Sim' : 'Não'}
      </div>
    ),
  }),
  menuColumnHelper.accessor('price', {
    header: 'Preço',
    cell: (info) =>
      Number(info.getValue()).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
  }),
]
