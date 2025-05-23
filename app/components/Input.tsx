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
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="block pt-3 pb-1 text-sm pl-1">
        {label}
      </label>
      <input
        {...register(id, register_options)}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        className={`
            w-full bg-[var(--foreground)]
            placeholder:text-[var(--text-muted)]
            text-sm border border-transparent rounded-md px-3 py-2
            focus:outline-none focus:border-[var(--accent)]
            hover:border-[var(--accent)]
            transition-colors
            ${error ? 'border-red-500' : ''}
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
            [appearance:textfield]
        `}
      />

      {hint && <span className="text-xs text-text-500">{hint}</span>}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
}
export default Input
