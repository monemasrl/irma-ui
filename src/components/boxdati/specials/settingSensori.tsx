import { motion } from 'framer-motion';
import React, { FC, useState, useContext } from 'react';
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
  const variants = {
    initial: { x: '104%' },
    open: { x: 0 },
    close: { x: '104%' },
  };
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
            onSubmit={handleSubmit((data) =>
              console.log(formValuesToNodeSettings(data))
            )}
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
                                />
                              </fieldset>
                              <fieldset>
                                <label htmlFor={'high'}>High</label>
                                <input
                                  type="number"
                                  {...register(
                                    `d${detector}s${sensor}w${window}_high`
                                  )}
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
