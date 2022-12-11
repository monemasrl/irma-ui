import { motion } from 'framer-motion';
import React, { FC, useState, useContext, useEffect } from 'react';
import { FiSettings, FiSave } from 'react-icons/fi';
import Node from '../../../typings/node';
import style from './settingSensori.module.scss';
import { UserContext } from '../../../context/user-context';
import CommandType from '../../../utils/command';
import { useForm } from 'react-hook-form';
import {
  NodeSettings,
  SensorSettings,
  DetectorSettings,
} from '../../../typings/nodeSettings';

type DemoButtonProps = {
  demoNumber: 1 | 2;
  applicationID: string;
  nodeID: number;
};

const DemoButton: FC<DemoButtonProps> = ({
  demoNumber,
  applicationID,
  nodeID,
}) => {
  const userSharedData = useContext(UserContext);

  const sendDemoCommand = () => {
    if (demoNumber === 1) {
      userSharedData.sendCommand(applicationID, nodeID, CommandType.SET_DEMO_1);
      return;
    }

    userSharedData.sendCommand(applicationID, nodeID, CommandType.SET_DEMO_2);
  };

  return (
    <button
      onClick={sendDemoCommand}
      className={style.demoBtn}
    >{`Demo${demoNumber}`}</button>
  );
};

const toOptionalNumber = (value: string | undefined): number | undefined => {
  if (!value || isNaN(+value)) {
    return undefined;
  }

  return +value;
};

const formValuesToNodeSettings = (values: FormValues): NodeSettings => {
  const settings: NodeSettings = {};

  const detectors = [1, 2, 3, 4] as const;
  const sensors = [1, 2] as const;
  const windows = [1, 2, 3] as const;

  detectors.forEach((n_detector) => {
    const detector: DetectorSettings = {};

    sensors.forEach((n_sensor) => {
      const sensor: SensorSettings = {};
      sensor.hv = toOptionalNumber(values[`d${n_detector}s${n_sensor}hv`]);

      windows.forEach((n_window) => {
        sensor[`w${n_window}_low`] = toOptionalNumber(
          values[`d${n_detector}s${n_sensor}w${n_window}_low`]
        );
        sensor[`w${n_window}_high`] = toOptionalNumber(
          values[`d${n_detector}s${n_sensor}w${n_window}_high`]
        );
      });

      detector[`s${n_sensor}`] = sensor;
    });

    settings[`d${n_detector}`] = detector;
  });

  return settings;
};

const nodeSettingsToFormValues = (settings: NodeSettings): FormValues => {
  return {
    d1s1hv: '' + settings['d1']?.['s1']?.['hv'],
    d1s1w1_low: '' + settings['d1']?.['s1']?.['w1_low'],
    d1s1w1_high: '' + settings['d1']?.['s1']?.['w1_high'],
    d1s1w2_low: '' + settings['d1']?.['s1']?.['w2_low'],
    d1s1w2_high: '' + settings['d1']?.['s1']?.['w2_high'],
    d1s1w3_low: '' + settings['d1']?.['s1']?.['w3_low'],
    d1s1w3_high: '' + settings['d1']?.['s1']?.['w3_high'],
    d1s2hv: '' + settings['d1']?.['s2']?.['hv'],
    d1s2w1_low: '' + settings['d1']?.['s2']?.['w1_low'],
    d1s2w1_high: '' + settings['d1']?.['s2']?.['w1_high'],
    d1s2w2_low: '' + settings['d1']?.['s2']?.['w2_low'],
    d1s2w2_high: '' + settings['d1']?.['s2']?.['w2_high'],
    d1s2w3_low: '' + settings['d1']?.['s2']?.['w3_low'],
    d1s2w3_high: '' + settings['d1']?.['s2']?.['w3_high'],

    d2s1hv: '' + settings['d2']?.['s1']?.['hv'],
    d2s1w1_low: '' + settings['d2']?.['s1']?.['w1_low'],
    d2s1w1_high: '' + settings['d2']?.['s1']?.['w1_high'],
    d2s1w2_low: '' + settings['d2']?.['s1']?.['w2_low'],
    d2s1w2_high: '' + settings['d2']?.['s1']?.['w2_high'],
    d2s1w3_low: '' + settings['d2']?.['s1']?.['w3_low'],
    d2s1w3_high: '' + settings['d2']?.['s1']?.['w3_high'],
    d2s2hv: '' + settings['d2']?.['s2']?.['hv'],
    d2s2w1_low: '' + settings['d2']?.['s2']?.['w1_low'],
    d2s2w1_high: '' + settings['d2']?.['s2']?.['w1_high'],
    d2s2w2_low: '' + settings['d2']?.['s2']?.['w2_low'],
    d2s2w2_high: '' + settings['d2']?.['s2']?.['w2_high'],
    d2s2w3_low: '' + settings['d2']?.['s2']?.['w3_low'],
    d2s2w3_high: '' + settings['d2']?.['s2']?.['w3_high'],

    d3s1hv: '' + settings['d3']?.['s1']?.['hv'],
    d3s1w1_low: '' + settings['d3']?.['s1']?.['w1_low'],
    d3s1w1_high: '' + settings['d3']?.['s1']?.['w1_high'],
    d3s1w2_low: '' + settings['d3']?.['s1']?.['w2_low'],
    d3s1w2_high: '' + settings['d3']?.['s1']?.['w2_high'],
    d3s1w3_low: '' + settings['d3']?.['s1']?.['w3_low'],
    d3s1w3_high: '' + settings['d3']?.['s1']?.['w3_high'],
    d3s2hv: '' + settings['d3']?.['s2']?.['hv'],
    d3s2w1_low: '' + settings['d3']?.['s2']?.['w1_low'],
    d3s2w1_high: '' + settings['d3']?.['s2']?.['w1_high'],
    d3s2w2_low: '' + settings['d3']?.['s2']?.['w2_low'],
    d3s2w2_high: '' + settings['d3']?.['s2']?.['w2_high'],
    d3s2w3_low: '' + settings['d3']?.['s2']?.['w3_low'],
    d3s2w3_high: '' + settings['d3']?.['s2']?.['w3_high'],

    d4s1hv: '' + settings['d4']?.['s1']?.['hv'],
    d4s1w1_low: '' + settings['d4']?.['s1']?.['w1_low'],
    d4s1w1_high: '' + settings['d4']?.['s1']?.['w1_high'],
    d4s1w2_low: '' + settings['d4']?.['s1']?.['w2_low'],
    d4s1w2_high: '' + settings['d4']?.['s1']?.['w2_high'],
    d4s1w3_low: '' + settings['d4']?.['s1']?.['w3_low'],
    d4s1w3_high: '' + settings['d4']?.['s1']?.['w3_high'],
    d4s2hv: '' + settings['d4']?.['s2']?.['hv'],
    d4s2w1_low: '' + settings['d4']?.['s2']?.['w1_low'],
    d4s2w1_high: '' + settings['d4']?.['s2']?.['w1_high'],
    d4s2w2_low: '' + settings['d4']?.['s2']?.['w2_low'],
    d4s2w2_high: '' + settings['d4']?.['s2']?.['w2_high'],
    d4s2w3_low: '' + settings['d4']?.['s2']?.['w3_low'],
    d4s2w3_high: '' + settings['d4']?.['s2']?.['w3_high'],
  };
};

export type FormValues = {
  d1s1hv?: string;
  d1s1w1_low?: string;
  d1s1w1_high?: string;
  d1s1w2_low?: string;
  d1s1w2_high?: string;
  d1s1w3_low?: string;
  d1s1w3_high?: string;
  d1s2hv?: string;
  d1s2w1_low?: string;
  d1s2w1_high?: string;
  d1s2w2_low?: string;
  d1s2w2_high?: string;
  d1s2w3_low?: string;
  d1s2w3_high?: string;

  d2s1hv?: string;
  d2s1w1_low?: string;
  d2s1w1_high?: string;
  d2s1w2_low?: string;
  d2s1w2_high?: string;
  d2s1w3_low?: string;
  d2s1w3_high?: string;
  d2s2hv?: string;
  d2s2w1_low?: string;
  d2s2w1_high?: string;
  d2s2w2_low?: string;
  d2s2w2_high?: string;
  d2s2w3_low?: string;
  d2s2w3_high?: string;

  d3s1hv?: string;
  d3s1w1_low?: string;
  d3s1w1_high?: string;
  d3s1w2_low?: string;
  d3s1w2_high?: string;
  d3s1w3_low?: string;
  d3s1w3_high?: string;
  d3s2hv?: string;
  d3s2w1_low?: string;
  d3s2w1_high?: string;
  d3s2w2_low?: string;
  d3s2w2_high?: string;
  d3s2w3_low?: string;
  d3s2w3_high?: string;

  d4s1hv?: string;
  d4s1w1_low?: string;
  d4s1w1_high?: string;
  d4s1w2_low?: string;
  d4s1w2_high?: string;
  d4s1w3_low?: string;
  d4s1w3_high?: string;
  d4s2hv?: string;
  d4s2w1_low?: string;
  d4s2w1_high?: string;
  d4s2w2_low?: string;
  d4s2w2_high?: string;
  d4s2w3_low?: string;
  d4s2w3_high?: string;
};

type Props = {
  node: Node;
};

const SettingsPanel: FC<Props> = ({ node }) => {
  const [open, setOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState<NodeSettings>({});
  const variants = {
    initial: { x: '104%' },
    open: { x: 0 },
    close: { x: '104%' },
  };
  console.log(defaultValues);
  console.log(nodeSettingsToFormValues(defaultValues));
  const userSharedData = useContext(UserContext);

  useEffect(() => {
    userSharedData.getNodeSettings(node.nodeID).then((settings) => {
      setDefaultValues(settings);
    });

    userSharedData.socket?.on('settings-update', () => {
      console.log('[SocketIO] Detected settings update');
      userSharedData.getNodeSettings(node.nodeID).then((settings) => {
        setDefaultValues(settings);
      });
    });

    return () => {
      userSharedData.socket?.off('settings-update');
    };
  }, []);

  const { register, handleSubmit } = useForm<FormValues>();

  const detectors = [1, 2, 3, 4] as const;
  const sensors = [1, 2] as const;
  const windows = [1, 2, 3] as const;

  return (
    <>
      <button
        className={style.settingSensoriBtn}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FiSettings />
      </button>
      <motion.section
        className={style.settingSensore}
        variants={variants}
        initial={'initial'}
        animate={open ? 'open' : 'close'}
        transition={{
          duration: 0.5,
          default: { ease: 'easeInOut' },
        }}
      >
        <div className={style.wrapperSetting}>
          <header>
            <div>
              <button
                className={style.settingSensoriBtnBack}
                onClick={() => setOpen((prev) => !prev)}
              >
                Back
              </button>
              <h3 className={style.title}>Setting sensori</h3>
            </div>
            <div className={style.demo}>
              <DemoButton
                demoNumber={1}
                nodeID={node.nodeID}
                applicationID={node.application}
              />
              <DemoButton
                demoNumber={2}
                nodeID={node.nodeID}
                applicationID={node.application}
              />
            </div>
          </header>
          <form
            onSubmit={handleSubmit((data) => {
              const settings = formValuesToNodeSettings(data);
              console.log(settings);
              userSharedData.updateNodeSettings(node.nodeID, settings);
            })}
          >
            {/* Create 4 detectors */}
            {detectors.map((detector) => {
              return (
                <div
                  className={style.singleSensor}
                  key={detector}
                >
                  <h3>{detector}</h3>

                  {/* Create 2 sensors */}
                  {sensors.map((sensor) => {
                    return (
                      <div
                        className={style.wrapperSetSensor}
                        key={sensor}
                      >
                        <fieldset className={style.fieldHv}>
                          <label htmlFor={'hv'}>HV</label>
                          <input
                            type="number"
                            className={style.hv}
                            defaultValue={
                              defaultValues[`d${detector}`]?.[`s${sensor}`]?.hv
                            }
                            {...register(`d${detector}s${sensor}hv`)}
                          />
                        </fieldset>

                        {/* Create 3 windows */}
                        {windows.map((window) => {
                          return (
                            <React.Fragment key={window}>
                              <fieldset>
                                <label htmlFor={'low'}>Low</label>
                                <input
                                  type="number"
                                  {...register(
                                    `d${detector}s${sensor}w${window}_low`
                                  )}
                                  defaultValue={
                                    defaultValues[`d${detector}`]?.[
                                      `s${sensor}`
                                    ]?.[`w${window}_low`]
                                  }
                                />
                              </fieldset>
                              <fieldset>
                                <label htmlFor={'high'}>High</label>
                                <input
                                  type="number"
                                  {...register(
                                    `d${detector}s${sensor}w${window}_high`
                                  )}
                                  defaultValue={
                                    defaultValues[`d${detector}`]?.[
                                      `s${sensor}`
                                    ]?.[`w${window}_low`]
                                  }
                                />
                              </fieldset>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <button
              type="submit"
              className={style.sensoriSetBtn}
            >
              <FiSave /> Salva
            </button>
          </form>
        </div>
      </motion.section>
    </>
  );
};

export default SettingsPanel;
