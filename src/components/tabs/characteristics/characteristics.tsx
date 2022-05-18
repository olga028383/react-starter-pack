import React from 'react';
import {GuitarType} from '../../../constants/adapters';
import {getAdaptedValue} from '../../../utils/utils';
import {Guitar} from '../../../types/guitar';


function Characteristics({guitar}: { guitar: Guitar }): JSX.Element {
  const {vendorCode, type, stringCount} = guitar;
  return (
    <table className="tabs__table">
      <tbody>
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
      </tbody>
    </table>
  );
}

export default Characteristics;
