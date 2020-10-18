import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '../components/molecules/Modal'


const Portal = ({ children }) => {
    const modalRoot = document.getElementById('modal')
    const element = document.createElement('div')

    useEffect(() => {
        modalRoot && modalRoot.appendChild(element);
        return () => modalRoot && modalRoot.removeChild(element)
    }, [modalRoot, element])

    return createPortal(children, element)
}

export const ModalComponent = ({ children, ...rest }) => {
    return (
        <Portal>
            {rest.open &&
                <Modal {...rest}>
                    {children}
                </Modal>
            }
        </Portal>
    )
}

export const useModal = (taskModalOpen = false) => {
    const [open, setOpen] = useState(taskModalOpen)
    const toggle = () => setOpen(!open)
    const Modal = ({ children, ...rest }) =>
        <ModalComponent toggle={toggle} open={open} {...rest}>{children}</ModalComponent>
    return { toggle, Modal }
}