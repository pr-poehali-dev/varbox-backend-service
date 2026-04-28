import { useState } from 'react';
import Icon from '@/components/ui/icon';

const plans = [
  { id: 'free', name: 'Free', price: '₽0', period: '/мес', vars: '1 000', projects: '2', team: '1', apis: '10K', current: false },
  { id: 'pro', name: 'Pro', price: '₽990', period: '/мес', vars: '50 000', projects: '20', team: '10', apis: '1M', current: true },
  { id: 'team', name: 'Team', price: '₽3 990', period: '/мес', vars: 'Без лимита', projects: 'Без лимита', team: 'Без лимита', apis: 'Без лимита', current: false },
];

const apiKeys = [
  { id: 1, name: 'Продакшн сервер', key: 'vbx_live_3f8a...k2m1', created: '15 янв 2024', lastUsed: '2ч назад', scope: 'read/write' },
  { id: 2, name: 'CI/CD Pipeline', key: 'vbx_live_9x2c...p5n7', created: '3 янв 2024', lastUsed: '30м назад', scope: 'read' },
  { id: 3, name: 'Local dev', key: 'vbx_live_7k1b...q4r9', created: '20 дек 2023', lastUsed: '5д назад', scope: 'read/write' },
];

const invoices = [
  { date: '1 апр 2024', amount: '₽990', status: 'Оплачено', plan: 'Pro' },
  { date: '1 мар 2024', amount: '₽990', status: 'Оплачено', plan: 'Pro' },
  { date: '1 фев 2024', amount: '₽990', status: 'Оплачено', plan: 'Pro' },
];

type Section = 'account' | 'billing' | 'api-keys' | 'team';

export default function Profile() {
  const [activeSection, setActiveSection] = useState<Section>('account');
  const [name, setName] = useState('Алексей Иванов');
  const [email, setEmail] = useState('alex@company.com');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const usage = { vars: 12400, limit: 50000, apis: 847000, apisLimit: 1000000 };
  const usagePercent = Math.round(usage.vars / usage.limit * 100);
  const apisPercent = Math.round(usage.apis / usage.apisLimit * 100);

  const menuItems: { id: Section; label: string; icon: string }[] = [
    { id: 'account', label: 'Аккаунт', icon: 'User' },
    { id: 'billing', label: 'Биллинг', icon: 'CreditCard' },
    { id: 'api-keys', label: 'API ключи', icon: 'Key' },
    { id: 'team', label: 'Команда', icon: 'Users' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{
        width: 220,
        borderRight: '1px solid var(--vb-border)',
        background: 'var(--vb-surface)',
        overflow: 'auto',
        padding: '20px 12px',
        flexShrink: 0,
      }}>
        {/* User card */}
        <div style={{
          padding: '14px',
          background: 'var(--vb-surface2)',
          border: '1px solid var(--vb-border)',
          borderRadius: 10,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>А</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--vb-text)' }}>Алексей</div>
            <div style={{ fontSize: 11.5, color: 'var(--vb-text3)' }}>Pro план</div>
          </div>
        </div>

        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '8px 10px',
              borderRadius: 7,
              border: 'none',
              background: activeSection === item.id ? 'var(--vb-green-dim)' : 'transparent',
              color: activeSection === item.id ? 'var(--vb-green)' : 'var(--vb-text2)',
              fontSize: 13.5,
              cursor: 'pointer',
              marginBottom: 2,
              fontFamily: 'IBM Plex Sans',
              textAlign: 'left',
              transition: 'all 0.15s',
            }}>
            <Icon name={item.icon} size={15} />
            {item.label}
          </button>
        ))}

        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--vb-border)' }}>
          <button style={{
            width: '100%',
            display: 'flex', alignItems: 'center', gap: 9,
            padding: '8px 10px', borderRadius: 7, border: 'none',
            background: 'transparent', color: 'var(--vb-red)',
            fontSize: 13.5, cursor: 'pointer', fontFamily: 'IBM Plex Sans', textAlign: 'left',
          }}>
            <Icon name="LogOut" size={15} />
            Выйти
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 36 }}>
        <div style={{ maxWidth: 700 }}>

          {/* Account */}
          {activeSection === 'account' && (
            <div className="animate-fade-in">
              <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>Аккаунт</h1>
              <p style={{ fontSize: 13.5, color: 'var(--vb-text3)', marginBottom: 32 }}>Управляйте данными профиля</p>

              <div style={{ background: 'var(--vb-surface)', border: '1px solid var(--vb-border)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, color: 'var(--vb-text)' }}>Личные данные</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, color: 'var(--vb-text3)', display: 'block', marginBottom: 6 }}>Имя</label>
                    <input value={name} onChange={e => setName(e.target.value)} style={{
                      width: '100%', padding: '9px 12px', borderRadius: 8,
                      border: '1px solid var(--vb-border)', background: 'var(--vb-surface2)',
                      color: 'var(--vb-text)', fontSize: 14, outline: 'none', fontFamily: 'IBM Plex Sans', boxSizing: 'border-box',
                    }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: 'var(--vb-text3)', display: 'block', marginBottom: 6 }}>Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} style={{
                      width: '100%', padding: '9px 12px', borderRadius: 8,
                      border: '1px solid var(--vb-border)', background: 'var(--vb-surface2)',
                      color: 'var(--vb-text)', fontSize: 14, outline: 'none', fontFamily: 'IBM Plex Sans', boxSizing: 'border-box',
                    }} />
                  </div>
                  <button onClick={handleSave} style={{
                    alignSelf: 'flex-start', padding: '9px 20px', borderRadius: 8,
                    border: 'none', background: saved ? 'var(--vb-green)' : 'var(--vb-text)',
                    color: '#000', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'IBM Plex Sans', display: 'flex', alignItems: 'center', gap: 6, transition: 'background 0.2s',
                  }}>
                    {saved ? <><Icon name="Check" size={14} /> Сохранено!</> : 'Сохранить'}
                  </button>
                </div>
              </div>

              <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: 24 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: 'var(--vb-red)' }}>Опасная зона</h2>
                <p style={{ fontSize: 13.5, color: 'var(--vb-text3)', marginBottom: 16 }}>Удаление аккаунта необратимо. Все данные будут удалены.</p>
                <button style={{
                  padding: '8px 16px', borderRadius: 8,
                  border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.08)',
                  color: 'var(--vb-red)', fontSize: 13.5, cursor: 'pointer', fontFamily: 'IBM Plex Sans',
                }}>Удалить аккаунт</button>
              </div>
            </div>
          )}

          {/* Billing */}
          {activeSection === 'billing' && (
            <div className="animate-fade-in">
              <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>Биллинг</h1>
              <p style={{ fontSize: 13.5, color: 'var(--vb-text3)', marginBottom: 32 }}>Управление подпиской и история платежей</p>

              {/* Usage */}
              <div style={{ background: 'var(--vb-surface)', border: '1px solid var(--vb-border)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, color: 'var(--vb-text)' }}>Использование в этом месяце</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { label: 'Переменные', used: usage.vars.toLocaleString('ru'), limit: usage.limit.toLocaleString('ru'), pct: usagePercent },
                    { label: 'API запросы', used: usage.apis.toLocaleString('ru'), limit: usage.apisLimit.toLocaleString('ru'), pct: apisPercent },
                  ].map(u => (
                    <div key={u.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 13.5, color: 'var(--vb-text2)' }}>{u.label}</span>
                        <span style={{ fontSize: 13, color: 'var(--vb-text3)', fontFamily: 'IBM Plex Mono' }}>
                          {u.used} / {u.limit}
                        </span>
                      </div>
                      <div style={{ height: 6, background: 'var(--vb-surface2)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', width: `${u.pct}%`, borderRadius: 3,
                          background: u.pct > 80 ? 'var(--vb-amber)' : 'var(--vb-green)',
                          transition: 'width 0.6s ease',
                        }} />
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--vb-text3)', marginTop: 4 }}>{u.pct}% использовано</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plans */}
              <div style={{ background: 'var(--vb-surface)', border: '1px solid var(--vb-border)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, color: 'var(--vb-text)' }}>Тарифные планы</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {plans.map(plan => (
                    <div key={plan.id} style={{
                      padding: 18, borderRadius: 10,
                      border: `1px solid ${plan.current ? 'var(--vb-green)' : 'var(--vb-border)'}`,
                      background: plan.current ? 'var(--vb-green-dim)' : 'var(--vb-surface2)',
                      position: 'relative',
                    }}>
                      {plan.current && (
                        <div style={{
                          position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                          background: 'var(--vb-green)', color: '#000', fontSize: 11, fontWeight: 700,
                          padding: '2px 10px', borderRadius: 100,
                        }}>Текущий</div>
                      )}
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--vb-text)', marginBottom: 4 }}>{plan.name}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 14 }}>
                        <span style={{ fontSize: 22, fontWeight: 700, color: plan.current ? 'var(--vb-green)' : 'var(--vb-text)', fontFamily: 'IBM Plex Mono' }}>{plan.price}</span>
                        <span style={{ fontSize: 12, color: 'var(--vb-text3)' }}>{plan.period}</span>
                      </div>
                      {[
                        { label: 'Переменных', value: plan.vars },
                        { label: 'Проектов', value: plan.projects },
                        { label: 'API запросов', value: plan.apis },
                      ].map(f => (
                        <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 12, color: 'var(--vb-text3)' }}>{f.label}</span>
                          <span style={{ fontSize: 12, color: 'var(--vb-text2)', fontFamily: 'IBM Plex Mono' }}>{f.value}</span>
                        </div>
                      ))}
                      {!plan.current && (
                        <button style={{
                          width: '100%', marginTop: 12, padding: '7px',
                          borderRadius: 7, border: '1px solid var(--vb-border)',
                          background: 'transparent', color: 'var(--vb-text2)',
                          fontSize: 13, cursor: 'pointer', fontFamily: 'IBM Plex Sans',
                        }}>Выбрать</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoices */}
              <div style={{ background: 'var(--vb-surface)', border: '1px solid var(--vb-border)', borderRadius: 12, padding: 24 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: 'var(--vb-text)' }}>История платежей</h2>
                {invoices.map((inv, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 0', borderBottom: i < invoices.length - 1 ? '1px solid var(--vb-border)' : 'none',
                  }}>
                    <div>
                      <div style={{ fontSize: 13.5, color: 'var(--vb-text)' }}>{inv.plan} план</div>
                      <div style={{ fontSize: 12, color: 'var(--vb-text3)' }}>{inv.date}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 13, color: 'var(--vb-green)' }}>{inv.status}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'IBM Plex Mono', color: 'var(--vb-text)' }}>{inv.amount}</span>
                      <button style={{
                        background: 'none', border: 'none', color: 'var(--vb-text3)', cursor: 'pointer',
                      }}>
                        <Icon name="Download" size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API Keys */}
          {activeSection === 'api-keys' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>API ключи</h1>
                <button style={{
                  padding: '8px 16px', borderRadius: 8, border: 'none',
                  background: 'var(--vb-green)', color: '#000', fontSize: 13.5, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'IBM Plex Sans',
                }}>
                  <Icon name="Plus" size={14} />
                  Создать ключ
                </button>
              </div>
              <p style={{ fontSize: 13.5, color: 'var(--vb-text3)', marginBottom: 28 }}>
                Ключи для доступа к API. Никогда не передавайте их третьим лицам.
              </p>

              <div style={{ background: 'var(--vb-surface)', border: '1px solid var(--vb-border)', borderRadius: 12, overflow: 'hidden' }}>
                {apiKeys.map((k, i) => (
                  <div key={k.id} style={{
                    padding: '18px 20px',
                    borderBottom: i < apiKeys.length - 1 ? '1px solid var(--vb-border)' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <Icon name="Key" size={14} />
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--vb-text)' }}>{k.name}</span>
                          <span style={{
                            fontSize: 11, padding: '2px 7px', borderRadius: 4,
                            background: k.scope === 'read' ? 'var(--vb-blue-dim)' : 'var(--vb-green-dim)',
                            color: k.scope === 'read' ? 'var(--vb-blue)' : 'var(--vb-green)',
                          }}>{k.scope}</span>
                        </div>
                        <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 12.5, color: 'var(--vb-text3)', marginBottom: 4 }}>{k.key}</div>
                        <div style={{ fontSize: 12, color: 'var(--vb-text3)' }}>
                          Создан {k.created} · Последнее использование {k.lastUsed}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button style={{
                          padding: '6px 12px', borderRadius: 7, border: '1px solid var(--vb-border)',
                          background: 'transparent', color: 'var(--vb-text2)', fontSize: 12.5,
                          cursor: 'pointer', fontFamily: 'IBM Plex Sans', display: 'flex', alignItems: 'center', gap: 5,
                        }}>
                          <Icon name="Copy" size={12} />
                          Скопировать
                        </button>
                        <button style={{
                          padding: '6px 10px', borderRadius: 7,
                          border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)',
                          color: 'var(--vb-red)', fontSize: 12, cursor: 'pointer',
                        }}>
                          <Icon name="Trash2" size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team */}
          {activeSection === 'team' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Команда</h1>
                <button style={{
                  padding: '8px 16px', borderRadius: 8, border: 'none',
                  background: 'var(--vb-green)', color: '#000', fontSize: 13.5, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'IBM Plex Sans',
                }}>
                  <Icon name="UserPlus" size={14} />
                  Пригласить
                </button>
              </div>
              <p style={{ fontSize: 13.5, color: 'var(--vb-text3)', marginBottom: 28 }}>3 из 10 участников</p>

              <div style={{ background: 'var(--vb-surface)', border: '1px solid var(--vb-border)', borderRadius: 12, overflow: 'hidden' }}>
                {[
                  { name: 'Алексей Иванов', email: 'alex@company.com', role: 'owner', avatar: 'А' },
                  { name: 'Мария Петрова', email: 'maria@company.com', role: 'admin', avatar: 'М' },
                  { name: 'Иван Сидоров', email: 'ivan@company.com', role: 'viewer', avatar: 'И' },
                ].map((m, i, arr) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 20px',
                    borderBottom: i < arr.length - 1 ? '1px solid var(--vb-border)' : 'none',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0,
                    }}>{m.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--vb-text)' }}>{m.name}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--vb-text3)' }}>{m.email}</div>
                    </div>
                    <span style={{
                      fontSize: 12, padding: '3px 10px', borderRadius: 5,
                      background: m.role === 'owner' ? 'var(--vb-green-dim)' : m.role === 'admin' ? 'var(--vb-blue-dim)' : 'var(--vb-surface2)',
                      color: m.role === 'owner' ? 'var(--vb-green)' : m.role === 'admin' ? 'var(--vb-blue)' : 'var(--vb-text3)',
                    }}>{m.role}</span>
                    {m.role !== 'owner' && (
                      <button style={{ background: 'none', border: 'none', color: 'var(--vb-text3)', cursor: 'pointer' }}>
                        <Icon name="MoreHorizontal" size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
