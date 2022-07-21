import style from './dashboard.module.scss'
import BtnStaker from '../btn/btnStaker';
import { IoApps, IoListOutline } from "react-icons/io5";
import Loader from '../loaders/loader';



function Dashboard({ isAlert, datiOrdinatiLista, stakerClicked, setStakerClicked, listview, setListView }) {
    
    const immagineLoader = "/images/cont.svg"

    function switchVisualizzaLista(switchList) {
        setListView(switchList)
        setStakerClicked(false)
    }

    return (
        <div className={`${style.dashboard} ${isAlert ? style.alert : ' '} ${listview ? style['lista'] : ' '}`}>
            <div className={style.switcherList}>
                {listview ?
                    <span onClick={() => switchVisualizzaLista(false)}><IoApps /></span> :
                    <span onClick={() => switchVisualizzaLista(true)}><IoListOutline /></span>}
            </div>
            {datiOrdinatiLista ? datiOrdinatiLista.map((item, index) => {
                return (
                    <BtnStaker key={item.sensorId}
                        state={item.state}
                        code={item.sensorId}
                        index={index}
                        setStakerClicked={setStakerClicked}
                        stakerClicked={stakerClicked}
                        listview={listview}
                    />)

            }): <Loader immagineLoader={immagineLoader} number={4}/>}

        </div>
    )
}

export default Dashboard
