import { useState } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Docs from './Docs';
import Profile from './Profile';
import Layout from '@/components/Layout';

type Page = 'landing' | 'dashboard' | 'docs' | 'profile';

export default function Index() {
  const [page, setPage] = useState<Page>('landing');

  if (page === 'landing') {
    return <Landing onEnter={() => setPage('dashboard')} />;
  }

  return (
    <Layout currentPage={page} onNavigate={(p) => setPage(p as Page)}>
      {page === 'dashboard' && <Dashboard />}
      {page === 'docs' && <Docs />}
      {page === 'profile' && <Profile />}
    </Layout>
  );
}
