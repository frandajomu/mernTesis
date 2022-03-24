import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ReactToastify.css';

const notExito = ({textoNot}) => {toast.success( textoNot, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
})}

const notError = ({textoNot}) => {toast.error( textoNot, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
})}
 
const notInfo = ({textoNot}) => {toast.info( textoNot, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
})}

export { notExito, notError, notInfo};