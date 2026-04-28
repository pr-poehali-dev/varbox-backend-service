import { useState } from 'react';
import Icon from '@/components/ui/icon';

const initialVars = [
  { id: 1, key: 'DATABASE_URL', value: 'postgresql://user:pass@host:5432/db', type: 'secret', env: 'production', updated: '2ч назад', version: 5 },
  { id: 2, key: 'API_BASE_URL', value: 'https://api.myapp.com/v2', type: 'string', env: 'production', updated: '3ч назад', version: 3 },
  { id: 3, key: 'MAX_CONNECTIONS', value: '100', type: 'number', env: 'production', updated: '1д назад', version: 2 },
  { id: 4, key: 'FEATURE_DARK_MODE', value: 'true', type: 'boolean', env: 'staging', updated: '2д назад', version: 7 },
  { id: 5, key: 'SMTP_HOST', value: 'smtp.sendgrid.net', type: 'string', env: 'production', updated: '3д назад', version: 1 },
  { id: 6, key: 'RATE_LIMIT', value: '1000', type: 'number', env: 'production', updated: '5д назад', version: 4 },
  { id: 7, key: 'CDN_URL', value: 'https://cdn.example.com', type: 'string', env: 'staging', updated: '1нд назад', version: 2 },
  { id: 8, key: 'LOG_LEVEL', value: 'warn', type: 'string', env: 'production', updated: '2нд назад', version: 3 },
];

const history = [
  { key: 'DATABASE_URL', action: 'Обновлено', time: '2ч назад', user: 'alex@company.com', version: 5 },
  { key: 'API_BASE_URL', action: 'Обновлено', time: '3ч назад', user: 'alex@company.com', version: 3 },
  { key: 'FEATURE_DARK_MODE', action: 'Создано', time: '2д назад', user: 'maria@company.com', version: 1 },
  { key: 'DATABASE_URL', action: 'Откат к v3', time: '3д назад', user: 'alex@company.com', version: 3 },
  { key: 'MAX_CONNECTIONS', action: 'Обновлено', time: '1нд назад', user: 'ivan@company.com', version: 2 },
];

const typeColor: Record<string, string> = {
  secret: 'var(--vb-red)',
  string: 'var(--vb-blue)',
  number: 'var(--vb-amber)',
  boolean: 'var(--vb-purple)',
};

const envColor: Record<string, string> = {
  production: 'var(--vb-green)',
  staging: 'var(--vb-amber)',
  development: 'var(--vb-blue)',
};

export default function Dashboard() {
  const [vars, setVars] = useState(initialVars);
  const [selectedVar, setSelectedVar] = useState<typeof initialVars[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'vars' | 'history'>('vars');
  const [showSecret, setShowSecret] = useState<Record<number, boolean>>({});
  const [envFilter, setEnvFilter] = useState('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newType, setNewType] = useState('string');

  const filtered = vars.filter(v => envFilter === 'all' || v.env === envFilter);

  const handleSave = (id: number) => {
    setVars(vars.map(v => v.id === id ? { ...v, value: editValue, version: v.version + 1, updated: 'только что' } : v));
    setEditingId(null);
  };

  const handleAdd = () => {
    if (!newKey.trim()) return;
    const newVar = {
      id: Date.now(),
      key: newKey.toUpperCase().replace(/\s/g, '_'),
      value: newValue,
      type: newType,
      env: 'production',
      updated: 'только что',
      version: 1,
    };
    setVars([newVar, ...vars]);
    setNewKey('');
    setNewValue('');
    setNewType('string');
    setShowAddModal(false);
  };

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Main panel */}
      <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--vb-text)', marginBottom: 4 }}>
              Переменные
            </h1>
            <p style={{ fontSize: 13, color: 'var(--vb-text3)' }}>
              {vars.length} переменных · Последнее обновление 2ч назад
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--vb-green)',
              color: '#000',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'IBM Plex Sans',
            }}>
            <Icon name="Plus" size={14} />
            Добавить
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid var(--vb-border)', paddingBottom: 0 }}>
          {[{ id: 'vars', label: 'Переменные', icon: 'Variable' }, { id: 'history', label: 'История изменений', icon: 'History' }].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'vars' | 'history')}
              style={{
                padding: '8px 14px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 13.5,
                fontFamily: 'IBM Plex Sans',
                color: activeTab === tab.id ? 'var(--vb-text)' : 'var(--vb-text3)',
                borderBottom: activeTab === tab.id ? '2px solid var(--vb-green)' : '2px solid transparent',
                marginBottom: -1,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'color 0.15s',
                fontWeight: activeTab === tab.id ? 500 : 400,
              }}>
              <Icon name={tab.icon} size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'vars' && (
          <>
            {/* Env filter */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {['all', 'production', 'staging', 'development'].map(env => (
                <button
                  key={env}
                  onClick={() => setEnvFilter(env)}
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

            {/* Variables table */}
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
                  onClick={() => setSelectedVar(selectedVar?.id === v.id ? null : v)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 3, height: 16, borderRadius: 2, background: typeColor[v.type] }} />
                    <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 12.5, color: 'var(--vb-text)' }}>{v.key}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {editingId === v.id ? (
                      <input
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onClick={e => e.stopPropagation()}
                        onKeyDown={e => e.key === 'Enter' && handleSave(v.id)}
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
                        onClick={e => { e.stopPropagation(); setShowSecret(s => ({ ...s, [v.id]: !s[v.id] })); }}
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
                        onClick={e => { e.stopPropagation(); handleSave(v.id); }}
                        style={{ background: 'none', border: 'none', color: 'var(--vb-green)', cursor: 'pointer', padding: 4 }}>
                        <Icon name="Check" size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={e => { e.stopPropagation(); setEditingId(v.id); setEditValue(v.value); }}
                        style={{ background: 'none', border: 'none', color: 'var(--vb-text3)', cursor: 'pointer', padding: 4 }}>
                        <Icon name="Pencil" size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'history' && (
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
        )}
      </div>

      {/* Right panel — detail */}
      {selectedVar && (
        <div className="animate-slide-right" style={{
          width: 300,
          borderLeft: '1px solid var(--vb-border)',
          background: 'var(--vb-surface)',
          overflow: 'auto',
          padding: 24,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--vb-text)' }}>Детали</span>
            <button
              onClick={() => setSelectedVar(null)}
              style={{ background: 'none', border: 'none', color: 'var(--vb-text3)', cursor: 'pointer' }}>
              <Icon name="X" size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--vb-text3)', marginBottom: 6, fontFamily: 'IBM Plex Mono', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ключ</div>
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 13, color: 'var(--vb-text)', background: 'var(--vb-surface2)', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--vb-border)' }}>
                {selectedVar.key}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, color: 'var(--vb-text3)', marginBottom: 6, fontFamily: 'IBM Plex Mono', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Тип</div>
              <span style={{
                fontSize: 12,
                padding: '4px 10px',
                borderRadius: 5,
                background: `${typeColor[selectedVar.type]}18`,
                color: typeColor[selectedVar.type],
                fontFamily: 'IBM Plex Mono',
              }}>{selectedVar.type}</span>
            </div>

            <div>
              <div style={{ fontSize: 11, color: 'var(--vb-text3)', marginBottom: 6, fontFamily: 'IBM Plex Mono', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Среда</div>
              <span style={{
                fontSize: 12,
                padding: '4px 10px',
                borderRadius: 5,
                background: `${envColor[selectedVar.env]}18`,
                color: envColor[selectedVar.env],
              }}>{selectedVar.env}</span>
            </div>

            <div>
              <div style={{ fontSize: 11, color: 'var(--vb-text3)', marginBottom: 6, fontFamily: 'IBM Plex Mono', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Версия</div>
              <div style={{ fontSize: 13, color: 'var(--vb-text)', fontFamily: 'IBM Plex Mono' }}>v{selectedVar.version}</div>
            </div>

            <div>
              <div style={{ fontSize: 11, color: 'var(--vb-text3)', marginBottom: 6, fontFamily: 'IBM Plex Mono', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Обновлено</div>
              <div style={{ fontSize: 13, color: 'var(--vb-text2)' }}>{selectedVar.updated}</div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button
                onClick={() => { setEditingId(selectedVar.id); setEditValue(selectedVar.value); setSelectedVar(null); }}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: 7,
                  border: '1px solid var(--vb-border)',
                  background: 'transparent',
                  color: 'var(--vb-text)',
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'IBM Plex Sans',
                }}>
                Редактировать
              </button>
              <button style={{
                padding: '8px 10px',
                borderRadius: 7,
                border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.08)',
                color: 'var(--vb-red)',
                fontSize: 13,
                cursor: 'pointer',
              }}>
                <Icon name="Trash2" size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={() => setShowAddModal(false)}>
          <div className="animate-fade-in-scale" style={{
            background: 'var(--vb-surface)',
            border: '1px solid var(--vb-border)',
            borderRadius: 14,
            padding: 28,
            width: 440,
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--vb-text)' }}>Новая переменная</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--vb-text3)', cursor: 'pointer' }}>
                <Icon name="X" size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: 'var(--vb-text3)', display: 'block', marginBottom: 6 }}>Ключ</label>
                <input
                  placeholder="MY_VARIABLE"
                  value={newKey}
                  onChange={e => setNewKey(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--vb-border)',
                    background: 'var(--vb-surface2)',
                    color: 'var(--vb-text)',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 13,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--vb-text3)', display: 'block', marginBottom: 6 }}>Значение</label>
                <input
                  placeholder="значение"
                  value={newValue}
                  onChange={e => setNewValue(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--vb-border)',
                    background: 'var(--vb-surface2)',
                    color: 'var(--vb-text)',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 13,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--vb-text3)', display: 'block', marginBottom: 6 }}>Тип</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['string', 'number', 'boolean', 'secret'].map(t => (
                    <button
                      key={t}
                      onClick={() => setNewType(t)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: 6,
                        border: '1px solid',
                        borderColor: newType === t ? typeColor[t] : 'var(--vb-border)',
                        background: newType === t ? `${typeColor[t]}18` : 'transparent',
                        color: newType === t ? typeColor[t] : 'var(--vb-text3)',
                        fontSize: 12,
                        cursor: 'pointer',
                        fontFamily: 'IBM Plex Mono',
                        transition: 'all 0.15s',
                      }}>{t}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button onClick={() => setShowAddModal(false)} style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 8,
                  border: '1px solid var(--vb-border)',
                  background: 'transparent',
                  color: 'var(--vb-text2)',
                  fontSize: 14,
                  cursor: 'pointer',
                  fontFamily: 'IBM Plex Sans',
                }}>Отмена</button>
                <button onClick={handleAdd} style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'var(--vb-green)',
                  color: '#000',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'IBM Plex Sans',
                }}>Создать</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
