import React, {useEffect, useState, MouseEvent} from 'react';
import './guitar-detail.css';
import {connect} from 'react-redux';
import browserHistory from '../../browser-history';
import {Link, useParams} from 'react-router-dom';
import Loading from '../loading/loading';
import NotFound from '../not-found/not-found';
import {QueryPageTypes} from '../../types/params';
import {Guitar} from '../../types/data';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import {AppRoute, Message} from '../../constants/constants';
import PageTitle from '../page-title/page-title';
import {formatPrice, replaceImagePath} from '../../utils/utils';
import Rating from '../rating/rating';
import Tabs from '../tabs/tabs';
import Reviews from '../reviews/reviews';
import {fetchGuitar} from '../../store/api-actions';
import {AxiosInstance} from 'axios';
import {getApi} from '../../store/application/selectors';
import {State} from '../../types/state';
import Modal from '../modal/modal';
import AddCart from '../add-cart/add-cart';
import AddCartSuccess from '../add-cart/add-cart-success/add-cart-success';

const mapStateToProps = (state: State) => ({
  api: getApi(state),
});

type Props = {
  api?: AxiosInstance
}

function GuitarDetail({api}: Props): JSX.Element {
  const params = useParams<QueryPageTypes>();
  const [modalActive, setModalActive] = useState(false);
  const [modalSuccessActive, setModalSuccessActive] = useState(false);
  const [data, setData] = useState({});
  const [countReview, setCountReview] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {

    fetchGuitar(params.id, api as AxiosInstance)
      .then((guitar) => {
        setData(guitar);
        setCountReview(guitar.comments? Number(guitar.comments.length):0);
        setIsLoading(false);
      })
      .catch(() => {
        setIsNotFound(true);
        setIsLoading(false);
      });

  }, [params.id]);


  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (isNotFound) {
    return (
      <NotFound/>
    );
  }

  const {name, previewImg, price, rating} = data as Guitar;
  const imageFormatted = replaceImagePath(previewImg);
  const breadcrumbs = [{to: AppRoute.CATALOG, text: Message.Catalog}, {to: '#', text: name}];

  const handleSetReviewCount = (countComments: number) => {
    setCountReview(Number(countComments));
  };

  const handleBuyClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setModalActive(true);
  };

  return (
    <>

      <PageTitle text={name}/>

      <Breadcrumbs links={breadcrumbs}/>

      <div className="product-container">
        <img className="product-container__img" src={imageFormatted.winPath} srcSet={`${imageFormatted.macPath} 2x`} width="90" height="235" alt={name}/>
        <div className="product-container__info-wrapper">
          <h2 className="product-container__title title title--big title--uppercase">{name}</h2>

          <Rating rate={rating} widthIcon='14' heightIcon='14' comments={countReview}/>

          <Tabs content={data as Guitar}/>
        </div>
        <div className="product-container__price-wrapper">
          <p className="product-container__price-info product-container__price-info--title">Цена:</p>
          <p className="product-container__price-info product-container__price-info--value">{formatPrice(price)}</p>
          <Link className="button button--red button--big product-container__button" to="#" onClick={handleBuyClick}>Добавить в корзину</Link>
        </div>
      </div>

      <Reviews guitar={data as Guitar} handleSetReviewCount={handleSetReviewCount}/>

      <Modal active={modalActive} setActive={setModalActive} additionalClass="modal-cart--add">
        <AddCart guitar={data as Guitar} setModalSuccessActive={() => setModalSuccessActive(true)} />
      </Modal>

      <Modal active={modalSuccessActive} setActive={setModalSuccessActive} additionalClass="modal--success">
        <AddCartSuccess setModalActive={() => setModalActive(false)} setModalSuccessActive={() => {setModalSuccessActive(false); browserHistory.replace(AppRoute.CATALOG);}}/>
      </Modal>
    </>
  );
}

export {GuitarDetail};
export default connect(mapStateToProps, null)(GuitarDetail);
