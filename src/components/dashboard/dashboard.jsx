import React from 'react'
import style from './dashboard.module.css'
import Btn from '../btn/btn'
import Loaderdash from '../loaders/loaderdash'


function Dashboard({isAlert, data, stakerClicked, setStakerClicked }) {

    return (
        <div className={`${style.dashboard} ${isAlert && style.alert}`}>
            {!data.data ? <Loaderdash />  :  data.data.map((item, index) => {
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