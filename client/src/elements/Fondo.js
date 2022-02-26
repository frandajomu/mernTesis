import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: -100;
    path {
        fill: rgba(135,182,194, .15);
    }
`;

const Fondo = () => {
    return (
        <>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path
                    fillOpacity="1"
                    d="M0,96L17.1,90.7C34.3,85,69,75,103,80C137.1,85,171,107,206,144C240,181,274,235,309,245.3C342.9,256,377,224,411,224C445.7,224,480,256,514,256C548.6,256,583,224,617,186.7C651.4,149,686,107,720,101.3C754.3,96,789,128,823,154.7C857.1,181,891,203,926,218.7C960,235,994,245,1029,245.3C1062.9,245,1097,235,1131,197.3C1165.7,160,1200,96,1234,96C1268.6,96,1303,160,1337,160C1371.4,160,1406,96,1423,64L1440,32L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z">
                </path>
            </Svg>
        </>
    );
}

export default Fondo;