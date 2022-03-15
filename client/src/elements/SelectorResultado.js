import React from 'react';
import { MostrarText } from "./Formularios";

const ResultSelect = ({value}) => {
    switch (value) {
        case undefined:
            return <MostrarText className="flex-fill" style={{ "width": "8rem" }}>Menor a 1/10,000 (0.01%)</MostrarText>;
        case 'Menor 1/10,000 (0.01%)':
            return <MostrarText className="flex-fill" style={{ "width": "8rem" }}>Menor a 1/10,000 (0.01%)</MostrarText>;
        case '1':
            return <MostrarText className="flex-fill" style={{ "width": "8rem" }}>Menor a 1/1,000 (0.1%)</MostrarText>;
        case '2':
            return <MostrarText className="flex-fill" style={{ "width": "8rem" }}>Menor a 1/100 (1%)</MostrarText>;
        case '3':
            return <MostrarText className="flex-fill" style={{ "width": "8rem" }}>Menor a 1/10 (10%)</MostrarText>;
        case '4':
            return <MostrarText className="flex-fill" style={{ "width": "8rem" }}>Menor a 50/100 (50%)</MostrarText>;
        case '5':
            return <MostrarText className="flex-fill" style={{ "width": "8rem" }}>Menor a 90/100 (90%)</MostrarText>;
        case '6':
            return <MostrarText className="flex-fill" style={{ "width": "8rem" }}>Menor a 99/100 (99%)</MostrarText>;
        default:
            break;
    }
}

export default ResultSelect;