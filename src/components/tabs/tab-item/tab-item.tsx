import React from 'react';
import {Link} from 'react-router-dom';

type tabItemType = {
  title: string,
  url: string,
  currentTab: string | undefined,
  handleTabClick?: (evt: React.MouseEvent<HTMLAnchorElement>) => void,
}

function TabItem({title, url, currentTab, handleTabClick}: tabItemType): JSX.Element {
  const notActiveTab = (currentTab !== title) ? 'button button--black-border' : '';
  return (
    <Link className={`button button--medium tabs__button ${notActiveTab}`} data-testid='tab-item' to={`${url}`} onClick={handleTabClick}>{title}</Link>
  );
}

export default TabItem;
