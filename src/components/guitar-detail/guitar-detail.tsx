import React, {useEffect, useState} from 'react';
import './guitar-detail.css';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import Loading from '../loading/loading';
import NotFound from '../not-found/not-found';
import {QueryPageTypes} from '../../types/params';
import {Guitar} from '../../types/data';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import {AppRoute, Title} from '../../constants/constants';
import PageTitle from '../page-title/page-title';
import {formatPrice, replaceImagePath} from '../../utils/utils';
import Rating from '../rating/rating';
import Tabs from '../tabs/tabs';
import Reviews from '../reviews/reviews';
import {fetchGuitar} from '../../store/api-actions';
import {AxiosInstance} from 'axios';
import {getApi} from '../../store/application/selectors';
import {State} from '../../types/state';

const mapStateToProps = (state: State) => ({
  api: getApi(state),
});

type GuitarDetailType = {
  api?: AxiosInstance
}

function GuitarDetail({api}: GuitarDetailType): JSX.Element {
  const params = useParams<QueryPageTypes>();
  const [data, setData] = useState({});
  const [countReview, setCountReview] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {

    fetchGuitar(params.id, api as AxiosInstance)
      .then((guitar) => {
        setData(guitar);
        setCountReview(Number(guitar.comments.length));
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
  const breadcrumbs = [{to: AppRoute.CATALOG, text: Title.CATALOG}, {to: '#', text: name}];

  const handleSetReviewCount = (countComments: number) => {
    setCountReview(Number(countComments));
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
          <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
        </div>
      </div>

      <Reviews guitar={data as Guitar} handleSetReviewCount={handleSetReviewCount}/>

    </>
  );
}

export {GuitarDetail};
export default connect(mapStateToProps, null)(GuitarDetail);
