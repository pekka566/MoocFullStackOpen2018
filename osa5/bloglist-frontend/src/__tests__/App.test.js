import React from 'react';
import {
  shallow
} from 'enzyme';
import SimpleBlog from '../components/SimpleBlog';


it('renders content', () => {
  const simpleBlog = {
    title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    author: 'Hessu Hopo',
    likes: 67
  };

  const SimpleBlogComponent = shallow( <
    SimpleBlog blog = {
      simpleBlog
    }
    />
  );
  const titleDiv = SimpleBlogComponent.find('.title');
  expect(titleDiv.text()).toContain(simpleBlog.title + ' ' + simpleBlog.author);
  const likesDiv = SimpleBlogComponent.find('.likes');
  expect(likesDiv.text()).toContain(simpleBlog.likes);
});