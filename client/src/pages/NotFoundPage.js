import React from 'react';
import { BotonMoradoDelineado } from '../elements/Botones';
import routes from '../helpers/Routes';
import { ReactComponent as Error404 } from './../images/Error404.svg';

const NotFoundPage = () => {
    return ( 
        <div className="container">
            <div className="row mt-5 pt-lg-4">
                <div className="col-8 col-sm-6 col-lg-5 mx-auto text-center ">
                    <Error404 className="mb-3 pb-lg-3 mb-lg-4"/>
                    <BotonMoradoDelineado to={routes.home}>Volver al Inicio</BotonMoradoDelineado>
                </div>
            </div>
        </div>
     );
}
 
export default NotFoundPage;