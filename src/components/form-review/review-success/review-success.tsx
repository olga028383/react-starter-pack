import React, {useEffect} from 'react';

function ReviewSuccess({currentModalActive, setCurrentModalActive, setFormReviewModal}: {currentModalActive: boolean, setCurrentModalActive: any, setFormReviewModal: any }): JSX.Element {

  useEffect(() => {
    if(currentModalActive) {
      setFormReviewModal(false);
    }
  }, [currentModalActive]);

  return (
    <>
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <p className="modal__message">Спасибо за ваш отзыв!</p>
      <div className="modal__button-container modal__button-container--review">
        <button className="button button--small modal__button modal__button--review" onClick={()=>{setCurrentModalActive(false);}}>К покупкам!</button>
      </div>
      <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
        <span className="button-cross__icon"></span>
        <span className="modal__close-btn-interactive-area"></span>
      </button>
    </>
  );
}

export default ReviewSuccess;
