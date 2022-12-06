import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import User from '../../typings/user';

// TODO: rivedere tipo alertConfirm
type FormValues = {
  alertConfirm: string;
  First_name: string;
  Last_name: string;
  Email: string;
  Role: 'admin' | 'standard';
  Phone_number: string;
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
        value={selectedUser?.first_name ?? ''}
        {...register('First_name', { required: true, maxLength: 80 })}
      />
      {errors.First_name && <span> (Campo Obbligatorio)</span>}
      <input
        type="text"
        placeholder={inputPlacehoder('Cognome', selectedUser?.last_name)}
        {...register('Last_name', { required: true, maxLength: 100 })}
        value={selectedUser?.last_name ?? ''}
      />
      {errors.Last_name && <span> (Campo Obbligatorio)</span>}
      <input
        type="text"
        placeholder={inputPlacehoder('Email', selectedUser?.email)}
        {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
        value={selectedUser?.email ?? ''}
      />
      {errors.Email && <span> (Campo Obbligatorio)</span>}
      <input
        type="tel"
        placeholder="Telefono"
        {...register('Phone_number', {
          required: true,
          minLength: 6,
          maxLength: 12,
        })}
        value={selectedUser?.phoneNumber ?? ''}
      />
      {errors.Phone_number && <span> (Campo Obbligatorio)</span>}
      <select
        className="user-select"
        {...register('Role', { required: true })}
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
      {errors.Role && <span> (Campo Obbligatorio)</span>}
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
