import React from 'react'
import style from './dashboard.module.css'
import Btn from '../btn/btn'
import { useState } from 'react'


function Dashboard({ data }) {
    const [btnClick, setBtnClick] = useState(false)

    return (
        <div className={style.dashboard}>
            {data.data && data.data.map((item, index) => {

                return (
                    <Btn
                        state={item.state}
                        code={item.code}
                        index={index}
                        setBtnClick={setBtnClick}
                        active={btnClick === index ? true : false}
                    />)

            })}

        </div>
    )
}

export default Dashboard