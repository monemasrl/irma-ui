import React from 'react';
import { ShareContext } from '../../context/context';
import { UserContext } from '../../context/user-context';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  alertID: string;
};

// TODO: rivedere tipo alertConfirm
type FormValues = {
  alertConfirm: string;
  noteAlert: string;
};

function FormAlert({ alertID }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const share = useContext(ShareContext);
  const userSharedData = useContext(UserContext);

  const submitting: SubmitHandler<FormValues> = (data) => {
    share.setConfirmState(undefined);

    console.log('Alert data', data, alertID);

    userSharedData.handleAlert(alertID, !!+data.alertConfirm, data.noteAlert);
  };

  return (
    <form
      id="form-alert"
      onSubmit={handleSubmit(submitting)}
    >
      <div className="box-confirm">
        <input
          {...register('alertConfirm', { required: true })}
          name="alertConfirm"
          type="radio"
          id="alert-confirmed"
          value={1}
        />
        <label
          htmlFor="alert-confirmed"
          className="radio-btn"
        >
          Si
        </label>
        <input
          {...register('alertConfirm', { required: true })}
          name="alertConfirm"
          id="false-alarm"
          type="radio"
          value={0}
        />
        <label
          htmlFor="false-alarm"
          className="radio-btn"
        >
          No
        </label>
        {errors.alertConfirm && <span> (Campo Obbligatorio)</span>}
      </div>
      <div>
        <div className="nota">Note sulla segnalazione</div>
        <textarea
          {...register('noteAlert', { required: true })}
          name="noteAlert"
          rows={4}
          cols={30}
          id="note-alert"
        />

        {errors.noteAlert && <span> (Campo Obbligatorio)</span>}
      </div>
      <button
        type="submit"
        className="alert-big"
      >
        {' '}
        INVIA{' '}
      </button>
    </form>
  );
}

export { FormAlert };
