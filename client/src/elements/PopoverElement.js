import React, { useState, useRef } from 'react';
import { ArrowContainer, Popover } from 'react-tiny-popover'
import styled from 'styled-components';
import theme from '../theme';
import { ReactComponent as AlertaRedonda } from './../images/AlertaRedonda.svg';

const PopoverElement = ({textos}) => {
    const clickMeButtonRef = useRef(HTMLButtonElement | undefined);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <>
            <Popover
                isOpen={isPopoverOpen}
                positions={['right']}
                padding={10}
                onClickOutside={() => setIsPopoverOpen(false)}
                ref={clickMeButtonRef} // if you'd like a ref to your popover's child, you can grab one here
                content={({ position, childRect, popoverRect }) => (
                    <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                        position={position}
                        childRect={childRect}
                        popoverRect={popoverRect}
                        arrowColor={theme.grisClaro}
                        arrowSize={10}
                        className='popover-arrow-container'
                        arrowClassName='popover-arrow'
                    >
                        <ContPopover onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                            {textos}
                        </ContPopover>
                    </ArrowContainer>
                )}
            >
                <AlertaModificada type="button" onClick={() => setIsPopoverOpen(!isPopoverOpen)} />
            </Popover>
        </>
    );
}

export default PopoverElement;

const ContPopover = styled.div`
    padding: 1rem 1rem 0.8rem 1.1rem;
    background: ${theme.grisClaro};
    color:  ${theme.moradoOscuro};
    border-radius: 0.5rem;
    text-align: center;
    font-size: 0.9rem;
`;

const AlertaModificada = styled(AlertaRedonda)`
    width: 1.5%;
    fill: ${theme.moradoClaro};

    &:hover {
        fill: ${theme.moradoOscuro};
    }
`;