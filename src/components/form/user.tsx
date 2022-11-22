import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import User from '../../typings/user';

// TODO: rivedere tipo alertConfirm
type FormValues = {
  alertConfirm: string;
  First_name: string;
  Last_name: string;
  Email: string;
  role: 'admin' | 'standard';
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

  function inputPlacehoder(label: string, data: string | undefined) {
    if (data) {
      return data;
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
      <select
        className="user-select"
        {...register('role', { required: true })}
      >
        <option
          value=""
          disabled
          selected={datiUtentePerForm ? false : true}
          hidden
        >
          Ruolo
        </option>
        <option
          value="admin"
          selected={datiUtentePerForm?.role === 'admin' ? true : false}
        >
          Admin
        </option>
        <option
          value="standard"
          selected={datiUtentePerForm?.role === 'standard' ? true : false}
        >
          Standard
        </option>
      </select>
      {errors.alertConfirm && <span> (Campo Obbligatorio)</span>}
      <button
        className="user-form"
        type="submit"
      >
        Salva
      </button>
    </form>
  );
};

export { UserRegistrationForm };
