import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
    const toastRoot = document.getElementById('snackbar-toast')
    const element = document.createElement('div')

    useEffect(() => {
        toastRoot && toastRoot.appendChild(element);
        return () => toastRoot && toastRoot.removeChild(element)
    }, [toastRoot, element])

    return createPortal(children, element)
}

export const Toast = () => <Portal><div /></Portal>