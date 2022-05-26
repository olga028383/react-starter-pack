import React from 'react';
import {render, screen} from '@testing-library/react';
import Description from './description';
import {Guitar} from '../../../mock/test';

describe('Component: Description', () => {

  it('should display Description', () => {

    render(<Description guitar={Guitar}/>);

    expect(screen.getByText(/Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям./i)).toBeInTheDocument();
  });
});
