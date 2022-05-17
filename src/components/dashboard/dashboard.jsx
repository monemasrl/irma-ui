import React from 'react'
import style from './dashboard.module.css'
import Btn from '../btn/btn'



function Dashboard({ data, stakerClicked, setStakerClicked }) {


    return (
        <div className={style.dashboard}>
            {data.data && data.data.map((item, index) => {
                return (
                    <Btn key={item.code}
                        state={item.state}
                        code={item.code}
                        index={index}
                        setStakerClicked={setStakerClicked}
                        stakerClicked={stakerClicked}
                    />)
            })}

        </div>
    )
}

export default Dashboard