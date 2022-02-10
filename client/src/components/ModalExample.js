import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import ChangePasswordResolver from '../validations/ChangePasswordResolver';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ModalExample = () => {
  const modalRef = useRef()

  const showModal = () => {
    const modalEle = modalRef.current
    const bsModal = new Modal(modalEle, {
      backdrop: 'static',
      keyboard: false
    })
    bsModal.show()
  }

  const hideModal = () => {
    const modalEle = modalRef.current
    const bsModal = bootstrap.Modal.getInstance(modalEle)
    bsModal.hide()
  }

  const notify = () => toast.success('Wow so easy!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
})

  const { register, handleSubmit, formState } = useForm({ resolver: ChangePasswordResolver });
  const { errors } = formState;

  const onSubmit = (formData) => {
    //formData funcionara para enviar los datos al Backend
    hideModal();
    notify();
  }

  return (
    <div className="addEmployee">
      <button type="button" className="btn btn-primary" onClick={showModal}>Add Employee</button>
      <div className="modal fade" ref={modalRef} tabIndex="-1" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
              <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="inpPassword1" className="form-label">Nueva Contraseña</label>
                  <input type="password" className="form-control" id="inpPassword1" {...register("password")} />
                  {errors?.password && (
                    <div className="form-text">
                      <div className="alert alert-danger" role="alert">
                        {errors.password.message}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="inpPassword2" className="form-label">Confirmar Contraseña</label>
                  <input type="password" className="form-control" id="inpPassword2" {...register("passwordConfirmation")} />
                  {errors?.passwordConfirmation && (
                    <div className="form-text">
                      <div className="alert alert-danger" role="alert">
                        {errors.passwordConfirmation.message}
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Understood</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ModalExample;