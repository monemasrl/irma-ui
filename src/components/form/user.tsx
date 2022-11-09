import React from 'react';
/* import { ShareContext } from '../../context/context';
import { UserContext } from '../../context/user-context';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
 */
import { useForm } from 'react-hook-form';

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

function UserForm() {
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
  return (
    <form>
      <input
        type="text"
        placeholder="First name"
        {...register('First_name', { required: true, maxLength: 80 })}
      />
      {errors.alertConfirm && <span> (Campo Obbligatorio)</span>}
      <input
        type="text"
        placeholder="Last name"
        {...register('Last_name', { required: true, maxLength: 100 })}
      />
      {errors.alertConfirm && <span> (Campo Obbligatorio)</span>}
      <input
        type="text"
        placeholder="Email"
        {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.alertConfirm && <span> (Campo Obbligatorio)</span>}
      <input
        type="tel"
        placeholder="Mobile number"
        {...register('Mobile_number', {
          required: true,
          minLength: 6,
          maxLength: 12,
        })}
      />
      {errors.alertConfirm && <span> (Campo Obbligatorio)</span>}
      <input type="submit" />
    </form>
  );
}

export { UserForm };
