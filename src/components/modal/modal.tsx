import React, {useEffect} from 'react';
import {RemoveScroll} from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';

type ModalType = {
  active: boolean,
  setActive: any,
  children: JSX.Element,
  additionalClass: string
}

function Modal({active, setActive, children, additionalClass}: ModalType): JSX.Element | null {
  const handleCloseModalClick = (evt: any) => {
    evt.preventDefault();
    setActive(false);
  };

  const handleModalKeydownClose = (evt: any) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleModalKeydownClose);

    return () => {
      document.removeEventListener('keydown', handleModalKeydownClose);
    };
  }, []);

  if(!active){
    return null;
  }

  return (
    <RemoveScroll>
      <FocusLock>
        <div className={`is-active modal ${additionalClass} modal-for-ui-kit`}>
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal data-testid="close" onClick={handleCloseModalClick}></div>
            <div className="modal__content">
              {children}
              <button className="modal__close-btn button-cross" onClick={handleCloseModalClick} type="button" aria-label="Закрыть">
                <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </FocusLock>
    </RemoveScroll>
  );
}

export default Modal;
