import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import {connect} from 'react-redux';
import {getGuitars} from '../../store/data/selectors';
import {State} from '../../types/state';
import {Guitar} from '../../types/data';
import GuitarCard from '../guitar-card/guitar-card';
import Modal from '../modal/modal';
import {Message} from '../../constants/constants';
import AddCart from '../add-cart/add-cart';
import AddCartSuccess from '../add-cart/add-cart-success/add-cart-success';

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
});

type Props = {
  guitars?: Guitar[],
}

function CatalogCards({guitars}: Props) {
  const [modalActive, setModalActive] = useState(false);
  const [modalSuccessActive, setModalSuccessActive] = useState(false);
  const [cartGuitar, setCartGuitar] = useState<Guitar | null>(null);

  const onBuyClick = (guitar: Guitar) => {
    setCartGuitar(guitar);
    setModalActive(true);
  };

  return (
    <>
      <div className='cards catalog__cards'>
        {guitars && guitars.length > 0 ? guitars.map((guitar) =>
          <GuitarCard key={`${nanoid()}-guitar`} guitar={guitar} onBuyClick={onBuyClick}/>) : Message.NotGuitars}
      </div>

      {
        cartGuitar !== null
        &&
          <>
            <Modal active={modalActive} setActive={setModalActive} additionalClass="modal-cart--add">
              <AddCart guitar={cartGuitar} setModalSuccessActive={() => setModalSuccessActive(true)} />
            </Modal>

            <Modal active={modalSuccessActive} setActive={setModalSuccessActive} additionalClass="modal--success">
              <AddCartSuccess setModalActive={() => setModalActive(false)} setModalSuccessActive={() => setModalSuccessActive(false)}/>
            </Modal>
          </>
      }
    </>
  );
}

export {CatalogCards};
export default connect(mapStateToProps)(CatalogCards);
