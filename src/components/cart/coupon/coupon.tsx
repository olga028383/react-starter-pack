import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import {connect} from 'react-redux';
import './coupon.css';
import {AppDispatch, State} from '../../../types/state';
import {sendCoupon} from '../../../store/api-actions';
import {getCoupon, getSalePercent} from '../../../store/cart/selectors';

export enum ValidateStatus {
  NO_CHECK = 'NO_CHECK',
  FAIL = 'FAIL',
  SUCCESS = 'SUCCESS',
}

const validateCoupon = (coupon: string): boolean => {
  const COUPONS = ['light-333', 'medium-444', 'height-555'];
  return /[^\s]/gim.test(coupon) && COUPONS.includes(coupon);
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSetSale: (coupon: string) => {
    dispatch(sendCoupon(coupon));
  },
});

const mapStateToProps = (state: State) => ({
  percent: getSalePercent(state),
  couponSale: getCoupon(state),
});

type Props = {
  onSetSale?: (coupon: string) => void,
  percent?: number,
  couponSale?: string | null,
}

function Coupon({onSetSale, percent = 0, couponSale = null}: Props): JSX.Element {
  const [coupon, setCoupon] = useState('');
  const [status, setStatus] = useState(ValidateStatus.NO_CHECK);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    setCoupon(target.value.replace(/\s/g, ''));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!validateCoupon(coupon)) {
      setStatus(ValidateStatus.FAIL);
      return false;
    }

    if (couponSale === coupon) {
      setStatus(ValidateStatus.SUCCESS);
      setCoupon('');
    }

    if (onSetSale && couponSale !== coupon) {
      onSetSale(coupon);
    }
  };

  useEffect(() => {
    if (percent > 0) {
      setStatus(ValidateStatus.SUCCESS);
      setCoupon('');
    }
  }, [percent]);

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form className="coupon__form" id="coupon-form" method="post" action="/" onSubmit={handleFormSubmit}>
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input type="text" placeholder="Введите промокод" data-testid="coupon" id="coupon" name="coupon" value={coupon} onChange={handleInputChange}/>
          {status === ValidateStatus.SUCCESS &&
          <p className="form-input__message form-input__message--success">Промокод принят</p>}
          {status === ValidateStatus.FAIL &&
          <p className="form-input__message form-input__message--error">неверный промокод</p>}
        </div>
        <button className="button button--big coupon__button">Применить</button>
      </form>
    </div>
  );
}

export {Coupon};
export default connect(mapStateToProps, mapDispatchToProps)(Coupon);

