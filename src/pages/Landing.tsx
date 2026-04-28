import Icon from '@/components/ui/icon';

interface LandingProps {
  onEnter: () => void;
}

const features = [
  {
    icon: 'Variable',
    title: 'Визуальный редактор',
    desc: 'Создавайте и редактируйте переменные с типизацией без единой строки кода.',
    color: 'var(--vb-green)',
  },
  {
    icon: 'GitBranch',
    title: 'История версий',
    desc: 'Каждое изменение фиксируется. Откатитесь к любой точке в один клик.',
    color: 'var(--vb-blue)',
  },
  {
    icon: 'Zap',
    title: 'API за секунды',
    desc: 'REST и GraphQL API генерируются автоматически для каждого проекта.',
    color: 'var(--vb-amber)',
  },
  {
    icon: 'Shield',
    title: 'Безопасность',
    desc: 'Шифрование at-rest и in-transit. Role-based доступ для команды.',
    color: 'var(--vb-purple)',
  },
  {
    icon: 'RefreshCw',
    title: 'Синхронизация',
    desc: 'Реал-тайм синхронизация между средами: dev, staging, production.',
    color: 'var(--vb-green)',
  },
  {
    icon: 'Terminal',
    title: 'CLI & SDK',
    desc: 'Полноценный CLI и TypeScript SDK для интеграции в любой стек.',
    color: 'var(--vb-blue)',
  },
];

const stats = [
  { value: '10M+', label: 'переменных управляется' },
  { value: '99.9%', label: 'uptime SLA' },
  { value: '<10ms', label: 'latency API' },
  { value: '4000+', label: 'команд используют' },
];

export default function Landing({ onEnter }: LandingProps) {
  return (
    <div style={{ background: 'var(--vb-bg)', minHeight: '100vh', fontFamily: 'IBM Plex Sans' }}>
      {/* Nav */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: 60,
        borderBottom: '1px solid var(--vb-border)',
        background: 'rgba(10,10,11,0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'var(--vb-green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#000', fontFamily: 'IBM Plex Mono' }}>V</span>
          </div>
          <span style={{ fontWeight: 600, fontSize: 16, color: 'var(--vb-text)' }}>VarBox</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="#features" style={{ fontSize: 13.5, color: 'var(--vb-text2)', textDecoration: 'none', padding: '6px 12px' }}>Возможности</a>
          <a href="#docs" style={{ fontSize: 13.5, color: 'var(--vb-text2)', textDecoration: 'none', padding: '6px 12px' }}>Документация</a>
          <button
            onClick={onEnter}
            style={{
              padding: '7px 16px',
              borderRadius: 7,
              border: '1px solid var(--vb-border)',
              background: 'transparent',
              color: 'var(--vb-text)',
              fontSize: 13.5,
              cursor: 'pointer',
              fontFamily: 'IBM Plex Sans',
            }}>
            Войти
          </button>
          <button
            onClick={onEnter}
            style={{
              padding: '7px 16px',
              borderRadius: 7,
              border: 'none',
              background: 'var(--vb-green)',
              color: '#000',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'IBM Plex Sans',
            }}>
            Начать бесплатно
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '100px 40px 80px',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Grid bg */}
        <div className="grid-pattern" style={{
          position: 'absolute', inset: 0, opacity: 0.3,
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
        }} />

        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 500,
          height: 300,
          background: 'radial-gradient(ellipse, rgba(34,197,94,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="animate-fade-in" style={{ position: 'relative' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 12px',
            borderRadius: 100,
            border: '1px solid var(--vb-border2)',
            background: 'var(--vb-surface)',
            fontSize: 12.5,
            color: 'var(--vb-text2)',
            marginBottom: 32,
          }}>
            <div className="dot-green" />
            Версия 2.0 — История версий теперь в реал-тайм
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: '-0.03em',
          }}>
            <span className="gradient-text">Управляйте переменными</span>
            <br />
            <span style={{ color: 'var(--vb-green)' }}>как профессионалы</span>
          </h1>

          <p style={{
            fontSize: 18,
            color: 'var(--vb-text2)',
            lineHeight: 1.7,
            maxWidth: 560,
            margin: '0 auto 40px',
          }}>
            VarBox — платформа для управления конфигурацией и переменными с визуальным редактором, историей версий и автоматическим API.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={onEnter}
              style={{
                padding: '12px 28px',
                borderRadius: 9,
                border: 'none',
                background: 'var(--vb-green)',
                color: '#000',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'IBM Plex Sans',
                boxShadow: '0 0 40px rgba(34,197,94,0.25)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
            >
              Открыть панель управления
              <Icon name="ArrowRight" size={16} />
            </button>
            <button style={{
              padding: '12px 24px',
              borderRadius: 9,
              border: '1px solid var(--vb-border)',
              background: 'transparent',
              color: 'var(--vb-text)',
              fontSize: 15,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'IBM Plex Sans',
              transition: 'border-color 0.15s',
            }}>
              <Icon name="Play" size={15} />
              Смотреть демо
            </button>
          </div>
        </div>

        {/* Code preview */}
        <div className="animate-fade-in delay-3" style={{
          position: 'relative',
          marginTop: 64,
          textAlign: 'left',
        }}>
          <div style={{
            background: 'var(--vb-surface)',
            border: '1px solid var(--vb-border)',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          }}>
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--vb-border)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ marginLeft: 10, fontSize: 12, color: 'var(--vb-text3)', fontFamily: 'IBM Plex Mono' }}>varbox.config.ts</span>
            </div>
            <div className="code-block" style={{ borderRadius: 0, border: 'none', fontSize: 13 }}>
              <div style={{ color: 'var(--vb-text3)' }}>{'// Автоматически генерируемый клиент'}</div>
              <div style={{ marginTop: 12 }}>
                <span style={{ color: '#a855f7' }}>import</span>
                <span style={{ color: 'var(--vb-text)' }}> {'{ varbox }'} </span>
                <span style={{ color: '#a855f7' }}>from</span>
                <span style={{ color: '#22c55e' }}> '@varbox/client'</span>
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: '#a855f7' }}>const</span>
                <span style={{ color: '#3b82f6' }}> config </span>
                <span style={{ color: 'var(--vb-text)' }}>= </span>
                <span style={{ color: '#a855f7' }}>await</span>
                <span style={{ color: 'var(--vb-text)' }}> varbox</span>
                <span style={{ color: 'var(--vb-text3)' }}>.</span>
                <span style={{ color: '#f59e0b' }}>get</span>
                <span style={{ color: 'var(--vb-text)' }}>({'{'}</span>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: '#3b82f6' }}>project</span>
                <span style={{ color: 'var(--vb-text)' }}>: </span>
                <span style={{ color: '#22c55e' }}>'my-app'</span>
                <span style={{ color: 'var(--vb-text3)' }}>,</span>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: '#3b82f6' }}>env</span>
                <span style={{ color: 'var(--vb-text)' }}>: </span>
                <span style={{ color: '#22c55e' }}>'production'</span>
                <span style={{ color: 'var(--vb-text3)' }}>,</span>
              </div>
              <div>
                <span style={{ color: 'var(--vb-text)' }}>{'})'}</span>
              </div>
              <div style={{ marginTop: 16, padding: '8px 12px', background: 'var(--vb-green-dim)', borderRadius: 6, display: 'inline-block' }}>
                <span style={{ color: 'var(--vb-green)', fontFamily: 'IBM Plex Mono', fontSize: 12 }}>
                  ✓ 47 переменных загружено за 8ms
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        borderTop: '1px solid var(--vb-border)',
        borderBottom: '1px solid var(--vb-border)',
        padding: '40px',
      }}>
        <div style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
        }}>
          {stats.map((stat, i) => (
            <div key={i} className="animate-fade-in" style={{
              animationDelay: `${i * 0.08}s`,
              textAlign: 'center',
              padding: '20px',
              borderRight: i < 3 ? '1px solid var(--vb-border)' : 'none',
            }}>
              <div style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--vb-green)', fontFamily: 'IBM Plex Mono' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: 'var(--vb-text3)', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '80px 40px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 12, fontFamily: 'IBM Plex Mono', color: 'var(--vb-green)', marginBottom: 12, letterSpacing: '0.1em' }}>
            ВОЗМОЖНОСТИ
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em' }} className="gradient-text">
            Всё для управления конфигурацией
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {features.map((f, i) => (
            <div key={i} className={`glass-card animate-fade-in delay-${i + 1}`} style={{ padding: 24 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: `${f.color}18`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Icon name={f.icon} size={18} />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: 'var(--vb-text)' }}>{f.title}</h3>
              <p style={{ fontSize: 13.5, color: 'var(--vb-text3)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '80px 40px',
        textAlign: 'center',
        borderTop: '1px solid var(--vb-border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 300,
          background: 'radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }} className="gradient-text">
          Готовы начать?
        </h2>
        <p style={{ color: 'var(--vb-text3)', fontSize: 16, marginBottom: 32 }}>
          Бесплатный план — до 1000 переменных. Никаких кредитных карт.
        </p>
        <button
          onClick={onEnter}
          style={{
            padding: '13px 32px',
            borderRadius: 9,
            border: 'none',
            background: 'var(--vb-green)',
            color: '#000',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'IBM Plex Sans',
            boxShadow: '0 0 60px rgba(34,197,94,0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          Открыть дашборд
          <Icon name="ArrowRight" size={16} />
        </button>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--vb-border)',
        padding: '24px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 13, color: 'var(--vb-text3)' }}>© 2024 VarBox. Все права защищены.</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Документация', 'API', 'Статус', 'Блог'].map((l) => (
            <a key={l} href="#" style={{ fontSize: 13, color: 'var(--vb-text3)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
