import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import User, { Role } from '../../typings/user';

// TODO: rivedere tipo alertConfirm
type FormValues = {
  alertConfirm: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  phoneNumber: string;
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
        placeholder={'Nome'}
        defaultValue={selectedUser?.first_name}
        {...register('firstName', { required: true, maxLength: 80 })}
      />
      {errors.firstName && <span> (Campo Obbligatorio)</span>}
      <input
        type="text"
        placeholder={'Cognome'}
        {...register('lastName', { required: true, maxLength: 100 })}
        defaultValue={selectedUser?.last_name}
      />
      {errors.lastName && <span> (Campo Obbligatorio)</span>}
      <input
        type="text"
        placeholder={'Email'}
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        defaultValue={selectedUser?.email}
      />
      {errors.email && <span> (Campo Obbligatorio)</span>}
      <input
        type="tel"
        placeholder="Telefono"
        {...register('phoneNumber', {
          required: true,
          minLength: 6,
          maxLength: 12,
        })}
        defaultValue={selectedUser?.phoneNumber}
      />
      {errors.phoneNumber && <span> (Campo Obbligatorio)</span>}
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
      {errors.role && <span> (Campo Obbligatorio)</span>}
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
