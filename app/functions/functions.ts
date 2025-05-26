import clsx, { type ClassValue } from 'clsx'
import io from 'socket.io-client'
import { twMerge } from 'tailwind-merge'

export const socket = io('http://localhost:8000/', {
    withCredentials: true,
    autoConnect: false,
})

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes))
