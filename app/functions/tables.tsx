import { createColumnHelper } from '@tanstack/react-table'
import axios from 'axios'
import { useState } from 'react'
import { MoreHorizontal, Trash } from 'react-feather'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuProvider, DropdownMenuTrigger } from '~/components/DropdownMenu'
import { Modal, ModalContent } from '~/components/Modal'
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
  menuColumnHelper.accessor('available', {
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
  menuColumnHelper.display({
    id: 'actions',
    cell: (info) => {
      const [isDeleting, setIsDeleting] = useState(false)

      async function deleteProduct() {
        const productId = info.row.original.id
        await axios.delete(`http://localhost:8000/product/${productId}`).then((res) => {
          if (res.status === 200) {
            toast.success('Produto excluído com sucesso!')
            setIsDeleting(false)
          }
        }).catch((err) => {
          if (err.response.status === 404) {
            toast.error('Produto não encontrado!')
          } else {
            toast.error('Erro ao excluir produto!')
          }
        })
      }
      
      return (
        <>
        <Modal
          open={isDeleting}
          setOpen={setIsDeleting}
          >
            <ModalContent className='h-fit'>
              <div className="flex flex-col gap-y-4 pt-4">
                <h1 className="text-2xl font-bold">Excluir produto</h1>
                <p className="text-sm text-text-500">
                  Você tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
                </p>
                <div className="flex gap-x-4">
                  <button
                    onClick={() => setIsDeleting(false)}
                    className="bg-background-700 text-text-50 px-4 py-2 rounded-md cursor-pointer hover:bg-background-600 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => deleteProduct()}
                    className="bg-red-500 text-text-50 px-4 py-2 rounded-md cursor-pointer hover:bg-red-600 transition-colors duration-200"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </ModalContent>
          </Modal>
      <DropdownMenuProvider>
        <DropdownMenuTrigger>
          <MoreHorizontal size={18}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className='flex items-center gap-x-2' onClick={() => {
            setIsDeleting(true)
          }}>
            <Trash size={18}/>
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuProvider>
      </>
      )
    },
  }),
]
