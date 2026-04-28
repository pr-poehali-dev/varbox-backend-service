import Icon from '@/components/ui/icon';

export const typeColor: Record<string, string> = {
  secret: 'var(--vb-red)',
  string: 'var(--vb-blue)',
  number: 'var(--vb-amber)',
  boolean: 'var(--vb-purple)',
};

export const envColor: Record<string, string> = {
  production: 'var(--vb-green)',
  staging: 'var(--vb-amber)',
  development: 'var(--vb-blue)',
};

export type VarItem = {
  id: number;
  key: string;
  value: string;
  type: string;
  env: string;
  updated: string;
  version: number;
};

interface VarsTableProps {
  filtered: VarItem[];
  selectedVar: VarItem | null;
  showSecret: Record<number, boolean>;
  editingId: number | null;
  editValue: string;
  envFilter: string;
  onSelectVar: (v: VarItem | null) => void;
  onToggleSecret: (id: number) => void;
  onStartEdit: (id: number, value: string) => void;
  onSave: (id: number) => void;
  onEditValueChange: (value: string) => void;
  onEnvFilterChange: (env: string) => void;
}

export default function VarsTable({
  filtered,
  selectedVar,
  showSecret,
  editingId,
  editValue,
  envFilter,
  onSelectVar,
  onToggleSecret,
  onStartEdit,
  onSave,
  onEditValueChange,
  onEnvFilterChange,
}: VarsTableProps) {
  return (
    <>
      {/* Env filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {['all', 'production', 'staging', 'development'].map(env => (
          <button
            key={env}
            onClick={() => onEnvFilterChange(env)}
            style={{
              padding: '4px 12px',
              borderRadius: 100,
              border: '1px solid',
              borderColor: envFilter === env ? (env === 'all' ? 'var(--vb-text3)' : envColor[env]) : 'var(--vb-border)',
              background: envFilter === env ? (env === 'all' ? 'var(--vb-surface2)' : `${envColor[env]}18`) : 'transparent',
              color: envFilter === env ? (env === 'all' ? 'var(--vb-text)' : envColor[env]) : 'var(--vb-text3)',
              fontSize: 12.5,
              cursor: 'pointer',
              fontFamily: 'IBM Plex Sans',
              transition: 'all 0.15s',
            }}>
            {env === 'all' ? 'Все среды' : env}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{
        background: 'var(--vb-surface)',
        border: '1px solid var(--vb-border)',
        borderRadius: 10,
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 3fr 80px 90px 80px 40px',
          padding: '10px 16px',
          borderBottom: '1px solid var(--vb-border)',
          fontSize: 11.5,
          color: 'var(--vb-text3)',
          fontFamily: 'IBM Plex Mono',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          <span>Ключ</span>
          <span>Значение</span>
          <span>Тип</span>
          <span>Среда</span>
          <span>Версия</span>
          <span></span>
        </div>

        {filtered.map((v, i) => (
          <div
            key={v.id}
            className="animate-fade-in"
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 3fr 80px 90px 80px 40px',
              padding: '12px 16px',
              borderBottom: i < filtered.length - 1 ? '1px solid var(--vb-border)' : 'none',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'background 0.15s',
              background: selectedVar?.id === v.id ? 'var(--vb-surface2)' : 'transparent',
              animationDelay: `${i * 0.04}s`,
            }}
            onClick={() => onSelectVar(selectedVar?.id === v.id ? null : v)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 3, height: 16, borderRadius: 2, background: typeColor[v.type] }} />
              <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 12.5, color: 'var(--vb-text)' }}>{v.key}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {editingId === v.id ? (
                <input
                  value={editValue}
                  onChange={e => onEditValueChange(e.target.value)}
                  onClick={e => e.stopPropagation()}
                  onKeyDown={e => e.key === 'Enter' && onSave(v.id)}
                  autoFocus
                  style={{
                    background: 'var(--vb-surface2)',
                    border: '1px solid var(--vb-green)',
                    borderRadius: 6,
                    padding: '4px 8px',
                    color: 'var(--vb-text)',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 12,
                    outline: 'none',
                    width: '100%',
                  }}
                />
              ) : (
                <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 12, color: 'var(--vb-text2)' }}>
                  {v.type === 'secret'
                    ? showSecret[v.id] ? v.value : '••••••••••••'
                    : v.value.length > 35 ? v.value.slice(0, 35) + '…' : v.value}
                </span>
              )}
              {v.type === 'secret' && (
                <button
                  onClick={e => { e.stopPropagation(); onToggleSecret(v.id); }}
                  style={{ background: 'none', border: 'none', color: 'var(--vb-text3)', cursor: 'pointer', padding: 2 }}>
                  <Icon name={showSecret[v.id] ? 'EyeOff' : 'Eye'} size={13} />
                </button>
              )}
            </div>

            <div>
              <span style={{
                fontSize: 11,
                padding: '2px 7px',
                borderRadius: 4,
                background: `${typeColor[v.type]}18`,
                color: typeColor[v.type],
                fontFamily: 'IBM Plex Mono',
              }}>{v.type}</span>
            </div>

            <div>
              <span style={{
                fontSize: 11,
                padding: '2px 7px',
                borderRadius: 4,
                background: `${envColor[v.env] || 'var(--vb-text3)'}18`,
                color: envColor[v.env] || 'var(--vb-text3)',
              }}>{v.env}</span>
            </div>

            <span style={{ fontSize: 11.5, color: 'var(--vb-text3)', fontFamily: 'IBM Plex Mono' }}>
              v{v.version}
            </span>

            <div style={{ display: 'flex', gap: 4 }}>
              {editingId === v.id ? (
                <button
                  onClick={e => { e.stopPropagation(); onSave(v.id); }}
                  style={{ background: 'none', border: 'none', color: 'var(--vb-green)', cursor: 'pointer', padding: 4 }}>
                  <Icon name="Check" size={14} />
                </button>
              ) : (
                <button
                  onClick={e => { e.stopPropagation(); onStartEdit(v.id, v.value); }}
                  style={{ background: 'none', border: 'none', color: 'var(--vb-text3)', cursor: 'pointer', padding: 4 }}>
                  <Icon name="Pencil" size={13} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
