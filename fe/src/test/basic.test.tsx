import { create } from 'react-test-renderer';
import { describe, expect, it, vi } from 'vitest';
import { Home, Layout, ShareMovie } from '../pages';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { httpClient } from '../api/httpClient';
import { Header, ProtectedRoute } from '../components';
import { AuthContext } from '../hooks/useAuth';

describe('App', () => {
  it('renders correctly', () => {
    vi.spyOn(httpClient, 'get').mockResolvedValue({ data: { movies: [] } });
    let renderer = create(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/share" element={<ShareMovie />} />
            </Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});

describe('Header', () => {
  describe('Given view for guest', () => {
    it('should render sign in/up', () => {
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
      let loggedInSnapshot = snapshot.children.find((c: any) => c.type === 'div');
      let shareMovieButton = loggedInSnapshot.children.find((c: any) => c.type === 'button')
      
      expect(shareMovieButton.children[0]).toEqual('Share a movie');
      expect(loggedInSnapshot.props.className).toEqual('logged-in-state')
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
});
