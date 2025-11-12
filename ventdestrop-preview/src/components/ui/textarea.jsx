import React from 'react'
export function Textarea(props) {
  return <textarea {...props} className={['w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300', props.className].join(' ')} />
}