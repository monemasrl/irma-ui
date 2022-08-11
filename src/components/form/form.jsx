import React from 'react'
import { ShareContext } from '../../context/context'
import { UserContext } from '../../context/user-context';
import { useContext } from 'react'
import { useForm } from "react-hook-form";
import Microservice from '../../services/microservice.service';



function FormAlert({ alertID }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const share = useContext(ShareContext)
    const userSharedData = useContext(UserContext);

    function submitting(data) {
        share.setConfirm(false)

        console.log("Alert data", data, alertID);

        Microservice.handleAlert(
            userSharedData.token, alertID, !!+data.alertConfirm, data.noteAlert);
    }

    return (

        <form id="form-alert" onSubmit={handleSubmit(submitting)}>
            <div className="box-confirm">
                <input  {...register("alertConfirm", { required: true })} name="alertConfirm" type="radio" id="alert-confirmed" value={1} />
                <label htmlFor='alert-confirmed' className='radio-btn' >
                    Si
                </label>
                <input {...register("alertConfirm", { required: true })} name="alertConfirm" id="false-alarm" type="radio" value={0} />
                <label htmlFor="false-alarm" className='radio-btn' >
                    No
                </label>
                {errors.alertConfirm && <span> (Campo Obbligatorio)</span>}
            </div>
            <div>
                <div className="nota">Note sulla segnalazione</div>
                <textarea {...register("noteAlert", { required: true })} name="noteAlert" rows="4" cols="30" id="note-alert" />
            
                {errors.noteAlert && <span> (Campo Obbligatorio)</span>}
            </div>
            <button type='submit' className='alert-big' > INVIA </button>
        </form>
    )
}

export { FormAlert }