import {ChangeEvent, useState, useEffect} from 'react';

export const usePriceFilter = (defaultPrice: number, currentPrice: number, onPrice: any, checkPrice: any, getPriceQueryValue: any) => {
  const [price, setPrice] = useState(currentPrice);

  const handlePriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;

    if (onPrice === undefined || getPriceQueryValue() === target.value) {
      return;
    }

    if (checkPrice()) {
      onPrice(price);
      return;
    }

    target.value = '';
    setPrice(0);

    if(getPriceQueryValue() !== null && getPriceQueryValue() !== target.value) {
      onPrice(0);
    }
  };

  const handlePriceInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    setPrice(Math.abs(Number(target.value)));
  };

  useEffect(() => {
    setPrice(Number(currentPrice));
  }, [currentPrice]);

  return {
    price,
    handlePriceBlur,
    handlePriceInput,
  };
};
