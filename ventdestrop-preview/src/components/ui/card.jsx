import React from 'react'

export function Card({ className='', children }) {
  return <div className={['bg-white border border-slate-200 rounded-2xl', className].join(' ')}>{children}</div>
}
export function CardHeader({ children }) { return <div className="p-5 border-b border-slate-100">{children}</div> }
export function CardTitle({ children, className='' }) { return <h3 className={['font-semibold text-lg', className].join(' ')}>{children}</h3> }
export function CardDescription({ children, className='' }) { return <p className={['text-slate-600 text-sm', className].join(' ')}>{children}</p> }
export function CardContent({ children, className='' }) { return <div className={['p-5', className].join(' ')}>{children}</div> }