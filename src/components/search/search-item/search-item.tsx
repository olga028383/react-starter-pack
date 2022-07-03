import {Link} from 'react-router-dom';
import {AppRoute} from '../../../constants/constants';
import {Guitar} from '../../../types/data';

type SearchItemType = {
  guitar: Guitar,
  handleLinkClick: () => void
}

function SearchItem({guitar, handleLinkClick}: SearchItemType ): JSX.Element {
  const {id, name} = guitar;
  return (
    <li className="form-search__select-item">
      <Link className="form-search__select-link"  to={`${AppRoute.PRODUCT}/${id}`} onClick={handleLinkClick} onKeyPress={handleLinkClick}>{name}</Link>
    </li>
  );
}

export default SearchItem;
