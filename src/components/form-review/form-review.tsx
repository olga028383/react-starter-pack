import React, {useState, ChangeEvent} from 'react';
import './form-review.css';
import {connect} from 'react-redux';
import RatingField from './rating-field/rating-field';
import {sendComment} from '../../store/api-actions';
import {Guitar, ReviewPost, Review} from '../../types/data';
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
  onSetServerError(message: string) {
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
  setReviewData: (review: Review) => void,
  onSetServerError?: any,
  showSuccessModal: (active: boolean) => void,
  api?: any
}

function FormReview({guitar, setReviewData, onSetServerError, showSuccessModal, api}: FormReview): JSX.Element {
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
      .catch((err) => onSetServerError(err.message));
  };

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input  = evt.target as HTMLInputElement | HTMLTextAreaElement;
    setData({
      ...data,
      ...getCurrentField(input.id, input.value),
    });
  };

  return (
    <div>
      <h2 className="modal__header modal__header--review title title--medium">???????????????? ??????????</h2>
      <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
      <form action="#" className="form-review" onSubmit={handleSubmit}>
        <div className="form-review__wrapper">
          <div className="form-review__name-wrapper">
            <label className="form-review__label form-review__label--required" htmlFor="userName">???????? ??????</label>
            <input className="form-review__input form-review__input--name" value={userName} id="userName" type="text" autoComplete="off" onChange={handleFieldChange}/>
            {(!userName && error) && <RequiredError/>}
          </div>
          <div>
            <span className="form-review__label form-review__label--required">???????? ????????????</span>
            <div className="rate rate--reverse">

              {new Array(COUNT_RATING).fill(null).map((element, index) => {
                const keyValue = `${index}-${element}`;
                return <RatingField index={++index} value={rating} handleRatingChange={handleFieldChange} key={keyValue}/>;
              })}

              {(!rating && error) && <p className="rate__message">?????????????????? ????????????</p>}
            </div>
          </div>
        </div>

        <label className="form-review__label form-review__label--required" htmlFor="advantage">??????????????????????</label>
        <input className="form-review__input" id="advantage" type="text" value={advantage} autoComplete="off" onChange={handleFieldChange}/>
        {(!advantage && error) && <RequiredError/>}
        <label className="form-review__label form-review__label--required" htmlFor="disadvantage">????????????????????</label>
        <input className="form-review__input" id="disadvantage" type="text" value={disadvantage} autoComplete="off" onChange={handleFieldChange}/>
        {(!disadvantage && error) && <RequiredError/>}
        <label className="form-review__label form-review__label--required" htmlFor="comment">??????????????????????</label>
        <textarea className="form-review__input form-review__input--textarea" id="comment" rows={10} value={comment} autoComplete="off" onChange={handleFieldChange}></textarea>
        {(!comment && error) && <RequiredError/>}
        <button className="button button--medium-20 form-review__button" type="submit">?????????????????? ??????????</button>
      </form>

    </div>
  );
}

export {FormReview};
export default connect(mapStateToProps, mapDispatchToProps)(FormReview);
