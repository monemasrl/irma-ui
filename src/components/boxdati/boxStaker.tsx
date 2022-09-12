import React, {
  useState,
  useContext,
  FC,
  Dispatch,
  SetStateAction,
} from 'react';
import style from './boxDati.module.scss';
import { RiTerminalFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { UserContext } from '../../context/user-context';
import { NodeState } from '../../typings/node';
import Reading from '../../typings/reading';
import Node from '../../typings/node';
import Nodo from './specials/nodo';

type StatoSensoreProps = {
  statoSensore: NodeState;
};

const StatoSensore: FC<StatoSensoreProps> = ({ statoSensore }) => {
  const uiStatiSensore = {
    ok: 'sensore funzionante',
    rec: 'in stato di rilevamento...',
    off: 'sensore non funzionante',
    'alert-ready': 'rilevata anomalia',
    // TODO: messaggio
    'alert-running': 'messaggio',
  };

  return (
    <div className={`${style.stato}`}>
      <div className={style.iconastato}>
        {statoSensore === 'rec' ? (
          <div className={style.iconastatoRec}>
            <div className={style.lancia}></div>
            <img
              src={`images/${statoSensore}-led.svg`}
              alt="icona ok"
            />
          </div>
        ) : (
          <img
            src={`images/${statoSensore}-led.svg`}
            alt="icona ok"
          />
        )}
      </div>
      <div className={`${style.datiStato} ${style[statoSensore]}`}>
        <div className={style.label}>{statoSensore}</div>
        <div className={style.datoLabel}>
          <RiTerminalFill />
          {uiStatiSensore[statoSensore]}
        </div>
      </div>
    </div>
  );
};

type BloccoNumericoProps = {
  datiNumerici: {
    titolo: string;
    dato: number;
  };
  sensorID: string;
  index: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BloccoNumerico: FC<BloccoNumericoProps> = ({
  datiNumerici,
  sensorID,
  index,
}) => {
  return (
    <>
      <motion.div
        key={sensorID}
        className={style.bloccoDati}
        initial={{ opacity: 0, top: 20 }}
        animate={{ opacity: 1, top: 0 }}
        exit={{ opacity: 0, top: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className={style.titoloInterno}>{datiNumerici.titolo}</div>
        <div className={style.datoInterno}>{datiNumerici.dato} </div>
      </motion.div>
    </>
  );
};

type BtnStartRecProps = {
  applicationID: string;
  nodeID: number;
};

const BtnStartRec: FC<BtnStartRecProps> = ({ applicationID, nodeID }) => {
  const [statoInvioDati, setStatoInvioDati] = useState(false);
  const userSharedData = useContext(UserContext);

  function iniziaLettura(applicationID: string, nodeID: number) {
    setStatoInvioDati(true);

    userSharedData
      .sendCommand(applicationID, nodeID, 0)
      .then(() => {
        console.log('stato aggiornato');
        setStatoInvioDati(false);
      })
      .catch((error) => {
        console.error('ORRORE ED ERRORE, QUALCUNO MI AIUTI...', error);
      });
  }

  return (
    <div className={style.wrapperbutton}>
      <button
        disabled={statoInvioDati}
        onClick={() => iniziaLettura(applicationID, nodeID)}
      >
        Inizia Rilevamento
      </button>
    </div>
  );
};

/* COMPONENTE PRINCIPALE */

type BoxStakerProps = {
  node: Node;
  letture: Reading[];
  setStakerClicked: Dispatch<SetStateAction<number>>;
};

const BoxStaker: FC<BoxStakerProps> = ({ node, letture, setStakerClicked }) => {
  console.log('letture', letture);
  const [dataSingoloSensore, setDataSingoloSensore] = useState<number>(1);
  console.log('datasingolosensore', dataSingoloSensore);

  return (
    <>
      <section className={style.layoutSensori}>
        <motion.header
          key={node.nodeID}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={style.title}>
            <div className={style.titoletto}>Reach Staker</div>
            <div className={style.codiceStaker}>{node.nodeName}</div>
          </div>

          <StatoSensore statoSensore={node.state} />
          {node.state === 'ok' && (
            <BtnStartRec
              applicationID={node.applicationID}
              nodeID={node.nodeID}
            />
          )}
          {letture.length !== 0 && (
            <Nodo
              setDataSingoloSensore={setDataSingoloSensore}
              Letture={letture}
            />
          )}
          {/* <div className={style.datiInterni}>
        {dati.datiInterni.map((dato, index) => (
          <React.Fragment key={dato.titolo}>
            <BloccoNumerico
              datiNumerici={dato}
              sensorID={dati.sensorID}
              index={index}
            />
          </React.Fragment>
        ))}
      </div> */}
        </motion.header>
      </section>
      <section className={style.layoutGraph}>
        {dataSingoloSensore}
        <button
          className={style.backToDash}
          onClick={() => setStakerClicked(-1)}
        >
          back
        </button>
      </section>
    </>
  );
};

export default BoxStaker;
