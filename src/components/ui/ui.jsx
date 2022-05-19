import React from 'react'
import style from './ui.module.css'
import { AiOutlineClose } from "react-icons/ai";


function Button({type, onClick, children}) {
  return (
    <button className={`${style[type]}`} onClick={onClick}>{children}</button>
  )
}

function CloseIcon({ onClick}) {
  return (
    <button className={style.closeIcon} onClick={onClick}><AiOutlineClose/></button>
  )
}

export {Button, CloseIcon}