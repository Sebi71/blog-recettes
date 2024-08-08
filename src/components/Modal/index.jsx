import { X } from 'lucide-react';
import { createPortal } from "react-dom";
import "./index.scss";

export default function Modal({openModal, handleModal, children}) {
  return createPortal (
    <>
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-close">
              <X onClick={handleModal} className='logo-close'/>
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.body
  );
}