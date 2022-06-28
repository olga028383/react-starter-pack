import {ChangeEvent, useState, useEffect} from 'react';

export const usePriceFilter = (defaultPrice: number, filterPrice: number, onPrice: any, checkValue: (price: number) => boolean) => {
  const [price, setPrice] = useState(filterPrice);

  const handlePriceChange = (evt: ChangeEvent<HTMLInputElement>) => {

    if (onPrice === undefined) {
      return;
    }

    const target = evt.target as HTMLInputElement;
    const currentPrice = Number(target.value);

    if (checkValue(currentPrice)) {
      onPrice(Number(defaultPrice));
      target.value = `${defaultPrice}`;
      return;
    }

    onPrice(currentPrice);

  };

  useEffect(() => {
    setPrice(Number(filterPrice));
  }, [filterPrice]);

  return {
    price,
    handlePriceChange,
  };
};
