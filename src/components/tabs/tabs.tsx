import React, {useState, MouseEvent} from 'react';
import './tabs.css';
import TabItem from './tab-item/tab-item';
import Characteristics from './characteristics/characteristics';
import Description from './description/description';
import {Guitar} from '../../types/data';
import {useParams} from 'react-router';
import {QueryPageTypes} from '../../types/params';
import {AppRoute} from '../../constants/constants';

const DEFAULT_TAB = 'Характеристики';

const dataTabs = new Map([
  ['characteristics', 'Характеристики'],
  ['description', 'Описание'],
]);

const renderContentTab = (guitar: Guitar, currentTab: string | undefined): JSX.Element => {

  if(currentTab === DEFAULT_TAB){
    return <Characteristics guitar={guitar}/>;
  }

  return <Description guitar={guitar}/>;
};

function Tabs({content}: {content: Guitar}): JSX.Element {
  const params = useParams<QueryPageTypes>();
  const [currentTab, setCurrentTab] = useState((params.tab && dataTabs.get(params.tab))? dataTabs.get(params.tab): DEFAULT_TAB);

  const handleTabClick = (evt: MouseEvent<HTMLAnchorElement>): void => {
    const link = evt.target as HTMLElement;
    const tabName = link.textContent ? link.textContent : DEFAULT_TAB;
    setCurrentTab(tabName);
  };

  return (
    <div className="tabs">

      {Array.from(dataTabs.entries()).map((tab) =>
        <TabItem key={tab[0]} title={tab[1]} url={`${AppRoute.PRODUCT}/${params.id}/${tab[0].toLocaleLowerCase()}`} currentTab={currentTab} handleTabClick={handleTabClick}/>)}

      <div className="tabs__content">
        {renderContentTab(content, currentTab)}
      </div>
    </div>
  );
}

export default Tabs;
