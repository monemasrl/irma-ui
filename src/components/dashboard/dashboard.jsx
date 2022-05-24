import React, { useState, useEffect } from 'react'
import style from './dashboard.module.css'
import Btn from '../btn/btn';
import { IoApps, IoListOutline } from "react-icons/io5";




function Dashboard({ isAlert, data, stakerClicked, setStakerClicked }) {

    const [listview, setListView] = useState(false)
    const [datiOrdinatiLista, setDatiOrdinatiLista] = useState('')


    useEffect(() => {
        const newdati = [...data?.data]
        if (data && listview) {
            console.log('test', newdati);
            const datiOrdinatiAlert = newdati.sort((a, b) => {
                if (a.state === 'alert') { return -1; }
                return 0;
            })
            setDatiOrdinatiLista(datiOrdinatiAlert)
        } else {
            setDatiOrdinatiLista(newdati)
        }

    }, [data, listview])



    return (
        <div className={`${style.dashboard} ${isAlert ? style.alert : ' '} ${listview ? style['lista'] : ' '}`}>
            <div className={style.switcherList}>
                {listview ?
                    <span onClick={() => setListView(false)}><IoApps /></span> :
                    <span onClick={() => setListView(true)}><IoListOutline /></span>}
            </div>
            {datiOrdinatiLista && datiOrdinatiLista.map((item, index,) => {
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