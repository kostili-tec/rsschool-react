import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import LogoutButton from '../components/UI/LogoutButton/LogoutButton';
import MainSearchForm from '../components/UI/MainComponents/MainSearchForm/MainSearchForm';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
import MainCard from '../components/UI/MainComponents/MainCard/MainCard';
import { store } from '../redux/store/store';
import { IUnsplashResults } from '../interfaces';

describe('Main page components tests', () => {
  it('shoud return to AccesForm by click on Logout button', () => {
    render(
      <Provider store={store}>
        <LogoutButton />
      </Provider>
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
  it('render MainSearcHForm', () => {
    render(
      <Provider store={store}>
        <MainSearchForm />
      </Provider>
    );
    const submitInput = screen.getByRole('search-input');
    expect(submitInput).toBeInTheDocument();
    expect(submitInput).toHaveValue('');
  });
});

describe('it LoadingSpinner test', () => {
  it('render LoadingSPinner', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByAltText('loading');
    expect(spinner).toBeInTheDocument();
    expect(spinner.getAttribute('class')).toContain('spinner');
  });
});

describe('MainCard tests', () => {
  const setCurrentId = vi.fn();
  const photoData: IUnsplashResults = {
    alt_description: 'alt description',
    color: 'green',
    description: 'description',
    created_at: '1992-12-12',
    id: '7-gtkXm2b5U',
    likes: 666,
    links: {
      download: 'download link',
      download_location: 'links, zwo',
      html: 'links, drei',
      self: 'links vier',
    },
    promoted_at: '1993-06-06',
    height: 999,
    width: 777,
    urls: {
      raw: 'https://images.unsplash.com/photo-1537094082840-dcbbfa99385f?ixid=Mnw0MzIzMTd8MHwxfHNlYXJjaHwxfHxsZWdzfGVufDB8fHx8MTY4MDcyNTQ4NA&ixlib=rb-4.0.3',
      full: 'https://images.unsplash.com/photo-1537094082840-dcbbfa99385f?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MzIzMTd8MHwxfHNlYXJjaHwxfHxsZWdzfGVufDB8fHx8MTY4MDcyNTQ4NA&ixlib=rb-4.0.3&q=85',
      regular:
        'https://images.unsplash.com/photo-1537094082840-dcbbfa99385f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzIzMTd8MHwxfHNlYXJjaHwxfHxsZWdzfGVufDB8fHx8MTY4MDcyNTQ4NA&ixlib=rb-4.0.3&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1537094082840-dcbbfa99385f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzIzMTd8MHwxfHNlYXJjaHwxfHxsZWdzfGVufDB8fHx8MTY4MDcyNTQ4NA&ixlib=rb-4.0.3&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1537094082840-dcbbfa99385f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzIzMTd8MHwxfHNlYXJjaHwxfHxsZWdzfGVufDB8fHx8MTY4MDcyNTQ4NA&ixlib=rb-4.0.3&q=80&w=200',
      small_s3:
        'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1537094082840-dcbbfa99385f',
    },
    user: {
      name: 'kyuss',
      links: {
        portfolio: 'https://api.unsplash.com/users/ciabattespugnose/portfolio',
        html: 'https://unsplash.com/pt-br/@ciabattespugnose',
      },
      profile_image: {
        small:
          'https://images.unsplash.com/profile-1583607573103-32c076b52f8eimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32',
        medium:
          'https://images.unsplash.com/profile-1583607573103-32c076b52f8eimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64',
        large:
          'https://images.unsplash.com/profile-1583607573103-32c076b52f8eimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128',
      },
    },
    tags: [
      { title: 'Tool', type: 'Archetype' },
      { title: 'Cosmic monster inc', type: 'Antitype' },
    ],
  };

  it('render MainCard', () => {
    render(<MainCard photoData={photoData} setCurrentId={setCurrentId} />);
    const cardImg = screen.getByAltText(/image-description/i);
    const likes = screen.getByText(/666/i);
    const tag = screen.getByText(/cosmic monster inc/i);
    expect(cardImg).toBeInTheDocument();
    expect(cardImg).toHaveAttribute('src', photoData.urls.small);
    expect(likes).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
  });

  it('click on card shoud calls setCurrentId', () => {
    render(<MainCard photoData={photoData} setCurrentId={setCurrentId} />);
    const card = screen.getByRole('main-card');
    fireEvent.click(card);
    expect(setCurrentId).toHaveBeenCalled();
    expect(setCurrentId).toHaveBeenCalledTimes(1);
  });
});
