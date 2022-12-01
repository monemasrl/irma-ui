import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
  selectedUser?: User;
};

const UserRegistrationForm: FC<Props> = ({ selectedUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  function inputPlacehoder(label: string, data: string | undefined) {
    if (data) {
      return data;
    }
    return label;
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form
      id="userForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        placeholder={inputPlacehoder('Nome', selectedUser?.first_name)}
        {...register('First_name', { required: true, maxLength: 80 })}
      />
      {errors.alertConfirm && <span> (Campo Obbligatorio)</span>}
      <input
        type="text"
        placeholder={inputPlacehoder('Cognome', selectedUser?.last_name)}
        {...register('Last_name', { required: true, maxLength: 100 })}
      />
      {errors.alertConfirm && <span> (Campo Obbligatorio)</span>}
      <input
        type="text"
        placeholder={inputPlacehoder('Email', selectedUser?.email)}
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
          selected={selectedUser ? false : true}
          hidden
        >
          Ruolo
        </option>
        <option
          value="admin"
          selected={selectedUser?.role === 'admin' ? true : false}
        >
          Admin
        </option>
        <option
          value="standard"
          selected={selectedUser?.role === 'standard' ? true : false}
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
