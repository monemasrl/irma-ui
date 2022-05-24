import React, { useState, useEffect } from 'react'
import style from './dashboard.module.css'
import Btn from '../btn/btn';
import { IoApps, IoListOutline } from "react-icons/io5";




function Dashboard({ isAlert, datiOrdinatiLista, stakerClicked, setStakerClicked, listview, setListView }) {




    return (
        <div className={`${style.dashboard} ${isAlert ? style.alert : ' '} ${listview ? style['lista'] : ' '}`}>
            <div className={style.switcherList}>
                {listview ?
                    <span onClick={() => setListView(false)}><IoApps /></span> :
                    <span onClick={() => setListView(true)}><IoListOutline /></span>}
            </div>
            {datiOrdinatiLista && datiOrdinatiLista.map((item, index) => {
                return (<Btn key={item.code}
                    state={item.state}
                    code={item.code}
                    index={index}
                    setStakerClicked={setStakerClicked}
                    stakerClicked={stakerClicked}
                    listview={listview}
                />)

            })}

        </div>
    )
}

export default Dashboard