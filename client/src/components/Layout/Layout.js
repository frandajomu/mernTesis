import React from 'react';
import NavBar from "../NavBar";

const Layout = ({children}) => {
    return ( 
        <div>
            <NavBar contenido={children}/>
        </div>
     );
}
 
export default Layout;