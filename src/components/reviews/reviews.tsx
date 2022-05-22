import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {fetchComments} from '../../store/api-actions';
import Loading from '../loading/loading';
import Review from './review/review';
import {Guitar, Review as ReviewType} from '../../types/data';
import {QueryPageTypes} from '../../types/params';
import {api} from '../../index';
import MoreButton from '../more-button/more-button';
import FormReview from '../form-review/form-review';
import Modal from '../modal/modal';
import ReviewSuccess from '../form-review/review-success/review-success';
import ButtonUp from '../button-up/button-up';

const MIN_COUNT_REVIEWS = 3;

function Reviews({guitar}: { guitar: Guitar }): JSX.Element {
  const params = useParams<QueryPageTypes>();

  const [comments, setComments] = useState<ReviewType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countReviews, setCountReviews] = useState(MIN_COUNT_REVIEWS);
  const [modalActive, setModalActive] = useState(false);
  const [modalSuccessActive, setModalSuccessActive] = useState(false);

  const handleButtonClick = () => {
    setCountReviews(countReviews + MIN_COUNT_REVIEWS);
  };

  const handleModalOpenButtonClick = (evt: any) => {
    evt.preventDefault();
    setModalActive(true);
  };

  const handleReviewData = (review: ReviewType) => {

    const commentsNew = [
      review,
      ...comments.slice(),
    ];
    setComments(commentsNew);
  };

  useEffect(() => {
    fetchComments(params.id, api)
      .then((commentsData: any) => {
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
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#" onClick={handleModalOpenButtonClick}>Оставить отзыв</a>

      {comments.slice(0, countReviews).map((comment: ReviewType) =>
        <Review key={comment.id} review={comment}/>)}

      {countReviews < comments.length && <MoreButton handleClickButton={handleButtonClick}/>}

      <ButtonUp/>

      <Modal active={modalActive} setActive={setModalActive} additionalClass="modal--review">
        <FormReview guitar={guitar} setReviewData={handleReviewData} showSuccessModal={setModalSuccessActive}/>
      </Modal>

      <Modal active={modalSuccessActive} setActive={setModalSuccessActive} additionalClass="modal--success">
        <ReviewSuccess currentModalActive={modalSuccessActive} setCurrentModalActive={setModalSuccessActive} setFormReviewModal={setModalActive}/>
      </Modal>

    </section>

  );
}

export default Reviews;
