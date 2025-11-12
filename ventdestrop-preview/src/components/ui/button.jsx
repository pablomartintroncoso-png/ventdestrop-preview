import React from 'react'

export function Button({ children, variant='default', size='md', className='', style, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition shadow-sm';
  const variants = {
    default: 'bg-slate-900 text-white hover:opacity-95',
    outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
    secondary: 'bg-white text-slate-900'
  };
  const sizes = { sm:'px-3 py-1.5 text-sm', md:'px-4 py-2', lg:'px-5 py-3 text-base', icon: 'h-10 w-10 p-0' };
  const cn = [base, variants[variant], sizes[size] || '', className].join(' ');
  return <button className={cn} style={style} {...props}>{children}</button>
}