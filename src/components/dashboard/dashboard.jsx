import React from 'react'
import style from './dashboard.module.css'
import Btn from '../btn/btn'



function Dashboard({ data, stakerClicked, setStakerClicked }) {

    function isAlert() {
        // controlla se c'è un alert nell'array in entrata
        const alert = data?.data?.filter((item) => item.state === 'alert').length
        if (alert >= 1){
            return true
        } else {return false}
    }


    return (
        <div className={`${style.dashboard} ${isAlert() && style.alert}`}>
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