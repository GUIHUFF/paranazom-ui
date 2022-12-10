import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export function Buttom(props : ButtonProps) {

  return (
    <button 
      {...props} 
      className={`py-2 px-4 bg-sky-200 rounded-lg hover:bg-sky-900 hover:text-zinc-50 ${props.className}`} >
      {props.children}
    </button>
  )

}

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps){
  return (
    <input 
      {...props}
      className="bg-zinc-50 py-3 px-4 rounded-lg text-sm placeholder:text-zinc-800"
    />
  )
}