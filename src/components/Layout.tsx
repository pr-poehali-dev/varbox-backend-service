import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
  { id: 'docs', label: 'Документация', icon: 'BookOpen' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
];

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--vb-bg)' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 220 : 60,
        background: 'var(--vb-surface)',
        borderRight: '1px solid var(--vb-border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s ease',
        flexShrink: 0,
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px 16px 16px',
          borderBottom: '1px solid var(--vb-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          overflow: 'hidden',
        }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: 'var(--vb-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#000', fontFamily: 'IBM Plex Mono' }}>V</span>
          </div>
          {sidebarOpen && (
            <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--vb-text)', whiteSpace: 'nowrap' }}>VarBox</span>
          )}
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 8px', flex: 1 }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: sidebarOpen ? '8px 10px' : '8px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                marginBottom: 2,
                transition: 'background 0.15s, color 0.15s',
                background: currentPage === item.id ? 'var(--vb-green-dim)' : 'transparent',
                color: currentPage === item.id ? 'var(--vb-green)' : 'var(--vb-text2)',
                justifyContent: sidebarOpen ? 'flex-start' : 'center',
                overflow: 'hidden',
              }}
            >
              <Icon name={item.icon} size={17} />
              {sidebarOpen && (
                <span style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: 'nowrap' }}>{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            margin: '0 8px 16px',
            padding: '7px',
            borderRadius: 7,
            border: '1px solid var(--vb-border)',
            background: 'transparent',
            color: 'var(--vb-text3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s',
          }}
        >
          <Icon name={sidebarOpen ? 'PanelLeftClose' : 'PanelLeftOpen'} size={15} />
        </button>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <header style={{
          height: 52,
          borderBottom: '1px solid var(--vb-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: 12,
          background: 'var(--vb-surface)',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="dot-green" />
            <span style={{ fontSize: 12.5, color: 'var(--vb-text3)', fontFamily: 'IBM Plex Mono' }}>prod / main</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{
              padding: '5px 12px',
              borderRadius: 7,
              border: '1px solid var(--vb-border)',
              background: 'transparent',
              color: 'var(--vb-text2)',
              fontSize: 12.5,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'IBM Plex Sans',
            }}>
              <Icon name="Search" size={13} />
              Поиск...
              <span style={{ fontSize: 11, color: 'var(--vb-text3)', marginLeft: 4 }}>⌘K</span>
            </button>
            <button style={{
              padding: '5px 12px',
              borderRadius: 7,
              border: 'none',
              background: 'var(--vb-green)',
              color: '#000',
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'IBM Plex Sans',
              transition: 'opacity 0.15s',
            }}>
              <Icon name="Plus" size={13} />
              Новая переменная
            </button>
            <div style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: '#fff',
              cursor: 'pointer',
            }}>А</div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}