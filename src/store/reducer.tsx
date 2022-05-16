import {combineReducers} from 'redux';
import {application} from './application/application';
import {data} from './data/data';

export const NameSpace = {
  DATA: 'DATA',
  APPLICATION: 'APPLICATION',
};

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APPLICATION]: application,
});


