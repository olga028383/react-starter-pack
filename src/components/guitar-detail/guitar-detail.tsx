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
import {Guitar} from '../../types/guitar';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import {AppRoute, Title} from '../../constants/constants';
import {GuitarType} from '../../constants/adapters';
import PageTitle from '../page-title/page-title';
import {formatPrice, getAdaptedValue, replaceImagePath} from '../../utils/utils';
import Rating from '../rating/rating';


const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
});


type guitarDetailTypeProps = {
  guitars?: any,
}

function GuitarDetail({guitars}: guitarDetailTypeProps): JSX.Element {
  const params = useParams<QueryPageTypes>();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPage, setIsPage] = useState(true);

  useEffect(() => {
    const id = Number(params.id);
    if (isNaN(id)) {
      setIsPage(false);
    }

    const page = guitars.filter((guitar: Guitar) => guitar.id === id);
    if (page) {
      setData(page[0]);
      setIsLoading(true);
    }
  }, [params.id]);


  if (!isLoading) {
    return (
      <Loading/>
    );
  }

  if (!isPage) {
    return (
      <NotFound/>
    );
  }

  const {name, previewImg, stringCount, vendorCode, description, price, type, rating} = data as Guitar;
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

              <div className="tabs">
                <a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{vendorCode}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{getAdaptedValue(type, GuitarType)}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{stringCount} струнная</td>
                    </tr>
                  </table>
                  <p className="tabs__product-description hidden">{description}</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{formatPrice(price)}</p>
              <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
            </div>
          </div>
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3>
            <a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.</p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Преображенская Ксения</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
            </div>
            <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
            <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
          </section>
        </div>
      </main>

      <Footer/>
    </>
  );
}

export {GuitarDetail};
export default connect(mapStateToProps, null)(GuitarDetail);
