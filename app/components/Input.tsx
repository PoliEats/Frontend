import type { RegisterOptions } from 'react-hook-form'

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

export default Input
