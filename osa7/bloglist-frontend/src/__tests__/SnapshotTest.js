import React from 'react';
import SimpleBlog from '../components/SimpleBlog';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<SimpleBlog />).toJSON();
  expect(tree).toMatchSnapshot();
});
