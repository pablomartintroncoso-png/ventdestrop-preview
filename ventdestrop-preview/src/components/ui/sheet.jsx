import React, { useState } from 'react'

export function Sheet({ children }) { return <div>{children}</div> }
export function SheetTrigger({ asChild, children }) {
  return React.cloneElement(children, { 'data-sheet-trigger': true })
}
export function SheetContent({ side='right', className='', children }) {
  const [open, setOpen] = useState(false)
  // Listen to trigger clicks in a naive way
  React.useEffect(() => {
    function onClick(e){
      const t = e.target.closest('[data-sheet-trigger]')
      if(t) setOpen(true)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  },[])
  return open ? (
    <div className={['fixed top-0 bottom-0', side==='right'?'right-0':'left-0','w-80 bg-white border-l border-slate-200 p-4 shadow-xl z-50', className].join(' ')}>
      <button className="mb-4 text-sm text-slate-600" onClick={()=>setOpen(false)}>Cerrar</button>
      {children}
    </div>
  ) : null
}