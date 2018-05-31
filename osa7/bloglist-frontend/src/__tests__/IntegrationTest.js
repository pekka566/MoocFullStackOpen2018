import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import Blog from '../components/Blog';
jest.mock('../services/blogs');

describe('<App />', () => {
  let app;
  beforeAll(() => {
    app = mount(<App />);
  });

  it('renders no blogs from backend if not logged', () => {
    app.update();
    const blogComponents = app.find(Blog);
    expect(blogComponents.length).toEqual(0);
  });
});
