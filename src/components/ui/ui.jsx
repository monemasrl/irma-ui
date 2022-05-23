import React from 'react'
import style from './ui.css'
import { AiOutlineClose } from "react-icons/ai";



function CloseIcon({ onClick }) {
  return (
    <button className="closeIcon" onClick={onClick}><AiOutlineClose /></button>
  )
}

export { CloseIcon }