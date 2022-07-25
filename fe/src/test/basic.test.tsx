import { act, create } from 'react-test-renderer';
import { describe, expect, it, vi } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import { httpClient } from '../api/httpClient';
import App from '../App';
import { Header } from '../components';
import { AuthContext } from '../hooks/useAuth';
import { Home, ShareMovie } from '../pages';

describe('App', () => {
  it('renders correctly', async () => {
    vi.spyOn(httpClient, 'get').mockResolvedValue({ data: { movies: [] } });
    let component: any;
    await act(async () => {
      component =create(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});

describe('Header', () => {
  describe('Given view for guest', () => {
    it('should render sign in/up button', () => {
      let renderer = create(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });

  describe('Given view for signed in user', () => {
    it('should render Logout button', () => {
      let renderer = create(
        <AuthContext.Provider
          value={{
            authUser: { email: 'test@gmail.com' },
            signOut: () => {},
            signIn: async (email: string, password: string) => {},
          }}
        >
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </AuthContext.Provider>
      );
      let snapshot: any = renderer.toJSON();
      let loggedInSnapshot = snapshot.children.find(
        (c: any) => c.type === 'div'
      );
      let shareMovieButton = loggedInSnapshot.children.find(
        (c: any) => c.type === 'button'
      );

      expect(shareMovieButton.children[0]).toEqual('Share a movie');
      expect(loggedInSnapshot.props.className).toEqual('logged-in-state');
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
});

describe('ShareMovie', () => {
  it('should render correctly', () => {
    let renderer = create(
      <MemoryRouter>
        <ShareMovie />
      </MemoryRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});

describe('Home', () => {
  it('should render correctly', async () => {
    vi.spyOn(httpClient, 'get').mockResolvedValue({
      data: { movies: [{ _id: '1', url: 'url', title: 'youtube' }] },
    });
    let component: any;
    await act(async () => {
      component = create(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
