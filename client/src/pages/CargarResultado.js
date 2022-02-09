import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CargarResultado = () => {
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

    return (
        <div className="container">
            <button onClick={notify}>Notify!</button>

            <h1>CargarResultado</h1>
        </div>
    );
}

export default CargarResultado;