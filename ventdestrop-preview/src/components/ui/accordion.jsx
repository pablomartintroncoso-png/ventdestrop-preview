import React, { useState } from 'react'
export function Accordion({ children }){ return <div>{children}</div> }
export function AccordionItem({ children }){ return <div className="border-b border-slate-200">{children}</div> }
export function AccordionTrigger({ children }){
  const [open,setOpen]=useState(false)
  return <div onClick={()=>setOpen(o=>!o)} className="cursor-pointer py-3 font-medium">{children}</div>
}
export function AccordionContent({ children }){ return <div className="py-2 text-sm text-slate-600">{children}</div> }