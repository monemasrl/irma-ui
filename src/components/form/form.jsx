import React from 'react'
import { ShareContext } from '../../context/context'
import { useContext } from 'react'
import { useForm } from "react-hook-form";



function FormAlert() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const share = useContext(ShareContext)

    function submitting(data) {
        share.setAlertData(data)
        share.setConfirm(false)
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