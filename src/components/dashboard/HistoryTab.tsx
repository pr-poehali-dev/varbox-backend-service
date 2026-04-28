import Icon from '@/components/ui/icon';

type HistoryItem = {
  key: string;
  action: string;
  time: string;
  user: string;
  version: number;
};

interface HistoryTabProps {
  history: HistoryItem[];
}

export default function HistoryTab({ history }: HistoryTabProps) {
  return (
    <div style={{
      background: 'var(--vb-surface)',
      border: '1px solid var(--vb-border)',
      borderRadius: 10,
      overflow: 'hidden',
    }}>
      {history.map((h, i) => (
        <div key={i} className="animate-fade-in" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '14px 18px',
          borderBottom: i < history.length - 1 ? '1px solid var(--vb-border)' : 'none',
          animationDelay: `${i * 0.05}s`,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--vb-surface2)',
            border: '1px solid var(--vb-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon name={h.action.includes('Откат') ? 'RotateCcw' : h.action.includes('Создано') ? 'Plus' : 'Pencil'} size={13} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 12.5, color: 'var(--vb-text)' }}>{h.key}</span>
              <span style={{
                fontSize: 11,
                padding: '1px 6px',
                borderRadius: 4,
                background: 'var(--vb-surface2)',
                color: 'var(--vb-text3)',
              }}>{h.action}</span>
              <span style={{ fontSize: 11, color: 'var(--vb-green)', fontFamily: 'IBM Plex Mono' }}>v{h.version}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--vb-text3)', marginTop: 3 }}>{h.user}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--vb-text3)' }}>{h.time}</span>
            <button style={{
              fontSize: 12,
              padding: '4px 10px',
              borderRadius: 6,
              border: '1px solid var(--vb-border)',
              background: 'transparent',
              color: 'var(--vb-text2)',
              cursor: 'pointer',
              fontFamily: 'IBM Plex Sans',
            }}>
              Откатить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
