import { create } from 'react-test-renderer';
import { describe, expect, test, vi } from 'vitest';
import { Home, Layout, ShareMovie } from '../pages';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { httpClient } from '../api/httpClient';
import { ProtectedRoute } from '../components';

describe('App', () => {
  test('renders correctly', () => {
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
