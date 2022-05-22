import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {getGuitars} from '../../store/data/selectors';
import Loading from '../loading/loading';
import Header from '../header/header';
import Footer from '../footer/footer';
import NotFound from '../not-found/not-found';
import {State} from '../../types/state';
import {QueryPageTypes} from '../../types/params';
import {Guitar} from '../../types/data';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import {AppRoute, Title} from '../../constants/constants';
import PageTitle from '../page-title/page-title';
import {formatPrice, replaceImagePath} from '../../utils/utils';
import Rating from '../rating/rating';
import Tabs from '../tabs/tabs';
import Reviews from '../reviews/reviews';

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
});


type guitarDetailTypeProps = {
  guitars?: any,
}

function GuitarDetail({guitars}: guitarDetailTypeProps): JSX.Element {
  const params = useParams<QueryPageTypes>();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const id = Number(params.id);
    const page = guitars.filter((guitar: Guitar) => guitar.id === id);

    if (page[0]) {
      setData(page[0]);
      setIsLoading(false);
    } else {
      setIsNotFound(true);
      setIsLoading(false);
    }

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

  return (
    <>
      <Header/>

      <main className="page-content">
        <div className="container">

          <PageTitle text={name}/>

          <Breadcrumbs links={breadcrumbs}/>

          <div className="product-container">
            <img className="product-container__img" src={imageFormatted} srcSet={`${imageFormatted}@2x.jpg 2x`} width="90" height="235" alt={name}/>
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>

              <Rating rate={rating} widthIcon='14' heightIcon='14'/>

              <Tabs content={data as Guitar}/>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{formatPrice(price)}</p>
              <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
            </div>
          </div>

          <Reviews guitar={data as Guitar}/>

        </div>
      </main>

      <Footer/>
    </>
  );
}

export {GuitarDetail};
export default connect(mapStateToProps, null)(GuitarDetail);
