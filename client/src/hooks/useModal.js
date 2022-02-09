import { useState } from 'react';

export default function useModal() {
    const [isOpen, setisOpen] = useState(false);
    const abierto = () => setisOpen(true);
    const cerrado = () => setisOpen(false);
  return [isOpen, abierto, cerrado];
}
