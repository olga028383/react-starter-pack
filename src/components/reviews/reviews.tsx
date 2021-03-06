import React, {useState, useEffect, MouseEvent} from 'react';
import './reviews.css';
import {connect} from 'react-redux';
import {nanoid} from 'nanoid';
import {Link, useParams} from 'react-router-dom';
import {fetchComments} from '../../store/api-actions';
import Loading from '../loading/loading';
import Review from './review/review';
import {Guitar, Review as ReviewType} from '../../types/data';
import {QueryPageTypes} from '../../types/params';
import MoreButton from '../more-button/more-button';
import FormReview from '../form-review/form-review';
import Modal from '../modal/modal';
import ReviewSuccess from '../form-review/review-success/review-success';
import ButtonUp from '../button-up/button-up';
import {AxiosInstance} from 'axios';
import {State} from '../../types/state';
import {getApi} from '../../store/application/selectors';

const MIN_COUNT_REVIEWS = 3;

const mapStateToProps = (state: State) => ({
  api: getApi(state),
});

type ReviewsType = {
  guitar: Guitar,
  handleSetReviewCount: (count: number) => void,
  api?: AxiosInstance
};

function Reviews({guitar, handleSetReviewCount, api}: ReviewsType): JSX.Element {
  const params = useParams<QueryPageTypes>();

  const [comments, setComments] = useState<ReviewType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countReviews, setCountReviews] = useState(MIN_COUNT_REVIEWS);
  const [modalActive, setModalActive] = useState(false);
  const [modalSuccessActive, setModalSuccessActive] = useState(false);

  const handleButtonClick = (evt: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    evt.preventDefault();
    setCountReviews(countReviews + MIN_COUNT_REVIEWS);
  };

  const handleModalOpenButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setModalActive(true);
  };

  const handleReviewData = (review: ReviewType) => {

    const commentsNew = [
      review,
      ...comments.slice(),
    ];
    setComments(commentsNew);

    const commentsCount = Number(commentsNew.length);
    handleSetReviewCount(commentsCount);
  };

  useEffect(() => {
    fetchComments(params.id, api as AxiosInstance)
      .then((commentsData: ReviewType[]) => {
        setComments(commentsData.slice().sort((a: ReviewType, b: ReviewType): number => (new Date(b.createAt).getTime() - new Date(a.createAt).getTime())));
        setIsLoading(true);
      });

  }, [params.id]);

  if (!isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">{comments.length > 0 ? '????????????' : '???????? ?????? ???? ???????????? ????????????'}</h3>
      <Link className="button button--red-border button--big reviews__sumbit-button" to="#" onClick={handleModalOpenButtonClick}>???????????????? ??????????</Link>

      {comments.slice(0, countReviews).map((comment: ReviewType) =>
        <Review key={`${nanoid()}-comments`} review={comment}/>)}

      {countReviews < comments.length && <MoreButton handleClickButton={handleButtonClick}/>}

      {comments.length > 0 && <ButtonUp/>}

      <Modal active={modalActive} setActive={setModalActive} additionalClass="modal--review">
        <FormReview guitar={guitar} setReviewData={handleReviewData} showSuccessModal={setModalSuccessActive}/>
      </Modal>

      <Modal active={modalSuccessActive} setActive={setModalSuccessActive} additionalClass="modal--success">
        <ReviewSuccess setCurrentModalActive={setModalSuccessActive} setFormReviewModal={setModalActive}/>
      </Modal>

    </section>

  );
}

export {Reviews};
export default connect(mapStateToProps, null)(Reviews);
