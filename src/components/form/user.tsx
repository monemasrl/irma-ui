import React, { FC } from 'react';
/* import { ShareContext } from '../../context/context';
import { UserContext } from '../../context/user-context';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
 */
import { useForm } from 'react-hook-form';
import User from '../../typings/user';

/* type Props = {
  alertID: string;
}; */

// TODO: rivedere tipo alertConfirm
type FormValues = {
  alertConfirm: string;
  First_name: string;
  Last_name: string;
  Email: string;
  Mobile_number: string;
};
type Props = {
  datiUtentePerForm?: User;
};
const UserRegistrationForm: FC<Props> = ({ datiUtentePerForm }) => {
  const {
    register,

    formState: { errors },
  } = useForm<FormValues>();
  /*
  const share = useContext(ShareContext);
  const userSharedData = useContext(UserContext);

   const formSubmit: SubmitHandler<FormValues> = (data) => {
    share.setConfirmState(undefined);

    userSharedData.handleAlert(alertID, !!+data.alertConfirm, data.noteAlert);
  };
 */

  function inputPlacehoder(label: string, id: string | undefined) {
    if (id) {
      return id;
    }
    return label;
  }
  return (
    <form id="userForm">
      <input
        type="text"
        placeholder={inputPlacehoder('Nome', datiUtentePerForm?.first_name)}
        {...register('First_name', { required: true, maxLength: 80 })}
      />
      {errors.alertConfirm && <span> (Campo Obbligatorio)</span>}
      <input
        type="text"
        placeholder={inputPlacehoder('Cognome', datiUtentePerForm?.last_name)}
        {...register('Last_name', { required: true, maxLength: 100 })}
      />
      {errors.alertConfirm && <span> (Campo Obbligatorio)</span>}
      <input
        type="text"
        placeholder={inputPlacehoder('Email', datiUtentePerForm?.email)}
        {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.alertConfirm && <span> (Campo Obbligatorio)</span>}
      <input
        type="tel"
        placeholder="Telefono"
        {...register('Mobile_number', {
          required: true,
          minLength: 6,
          maxLength: 12,
        })}
      />
      {errors.alertConfirm && <span> (Campo Obbligatorio)</span>}
      <button
        className="user-form"
        type="submit"
      >
        Invia
      </button>
    </form>
  );
};

export { UserRegistrationForm };
