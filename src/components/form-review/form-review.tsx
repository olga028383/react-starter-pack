import React, {useState} from 'react';
import {connect} from 'react-redux';
import RatingField from './rating-field/rating-field';
import {sendComment} from '../../store/api-actions';
import {Guitar, ReviewPost} from '../../types/data';
import RequiredError from './required-error/required-error';
import {setServerError} from '../../store/action';
import {AppDispatch, State} from '../../types/state';
import {getApi} from '../../store/application/selectors';

const COUNT_RATING = 5;

const Field = {
  UserName: 'userName',
  Advantage: 'advantage',
  Disadvantage: 'disadvantage',
  Comment: 'comment',
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  handleSetServerError(message: string) {
    dispatch(setServerError(message));
  },
});

const mapStateToProps = (state: State) => ({
  api: getApi(state),
});

const getCurrentField = (id: string, value: string): any => {

  if (/star-[1-5]/g.test(id)) {
    return {'rating': Number(value)};
  }

  switch (id) {
    case Field.UserName:
      return {'userName': value};
    case Field.Advantage:
      return {'advantage': value};
    case Field.Disadvantage:
      return {'disadvantage': value};
    case Field.Comment:
      return {'comment': value};
  }
};

const checkValidate = (data: ReviewPost): boolean => (!Object.values(data).filter((value) => !value).length);

type FormReview = {
  guitar: Guitar,
  setReviewData: any,
  handleSetServerError?: any,
  showSuccessModal: any,
  api?: any
}

function FormReview({guitar, setReviewData, handleSetServerError, showSuccessModal, api}: FormReview): JSX.Element {
  const {name, id} = guitar;
  const [error, setError] = useState(false);

  const [data, setData] = useState<ReviewPost>({
    guitarId: id,
    userName: '',
    advantage: '',
    disadvantage: '',
    comment: '',
    rating: 0,
  });

  const {userName, advantage, disadvantage, rating, comment} = data;

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    if (!checkValidate(data)) {
      setError(true);
      return;
    }

    sendComment(data, api)
      .then((result) => {

        setReviewData(result);
        setData({
          ...data,
          userName: '',
          advantage: '',
          disadvantage: '',
          comment: '',
          rating: 0,
        });

        setError(false);

        showSuccessModal(true);
      })
      .catch((err) => handleSetServerError(err.message));
  };

  const handleFieldChange = (evt: any) => {
    setData({
      ...data,
      ...getCurrentField(evt.target.id, evt.target.value),
    });
  };

  return (
    <div>
      <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
      <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
      <form action="#" className="form-review" onSubmit={handleSubmit}>
        <div className="form-review__wrapper">
          <div className="form-review__name-wrapper">
            <label className="form-review__label form-review__label--required" htmlFor="userName">Ваше Имя</label>
            <input className="form-review__input form-review__input--name" value={userName} id="userName" type="text" autoComplete="off" onChange={handleFieldChange}/>
            {(!userName && error) && <RequiredError/>}
          </div>
          <div>
            <span className="form-review__label form-review__label--required">Ваша Оценка</span>
            <div className="rate rate--reverse">

              {new Array(COUNT_RATING).fill(null).map((element, index) => {
                const keyValue = `${index}-${element}`;
                return <RatingField index={COUNT_RATING - index} value={rating} handleRatingChange={handleFieldChange} key={keyValue}/>;
              })}

              {(!rating && error) && <p className="rate__message">Поставьте оценку</p>}
            </div>
          </div>
        </div>

        <label className="form-review__label form-review__label--required" htmlFor="advantage">Достоинства</label>
        <input className="form-review__input" id="advantage" type="text" value={advantage} autoComplete="off" onChange={handleFieldChange}/>
        {(!advantage && error) && <RequiredError/>}
        <label className="form-review__label form-review__label--required" htmlFor="disadvantage">Недостатки</label>
        <input className="form-review__input" id="disadvantage" type="text" value={disadvantage} autoComplete="off" onChange={handleFieldChange}/>
        {(!disadvantage && error) && <RequiredError/>}
        <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
        <textarea className="form-review__input form-review__input--textarea" id="comment" rows={10} value={comment} autoComplete="off" onChange={handleFieldChange}></textarea>
        {(!comment && error) && <RequiredError/>}
        <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
      </form>

    </div>
  );
}

export {FormReview};
export default connect(mapStateToProps, mapDispatchToProps)(FormReview);
