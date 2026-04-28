import { useState } from 'react';
import Icon from '@/components/ui/icon';

const sections = [
  { id: 'quickstart', label: 'Быстрый старт', icon: 'Zap' },
  { id: 'rest-api', label: 'REST API', icon: 'Globe' },
  { id: 'sdk', label: 'SDK / TypeScript', icon: 'Code2' },
  { id: 'webhooks', label: 'Webhooks', icon: 'Webhook' },
  { id: 'auth', label: 'Авторизация', icon: 'Lock' },
  { id: 'versioning', label: 'Версионирование', icon: 'GitBranch' },
];

const codeExamples: Record<string, { title: string; desc: string; code: string; lang: string }[]> = {
  quickstart: [
    {
      title: 'Установка',
      desc: 'Добавьте SDK в ваш проект',
      lang: 'bash',
      code: `npm install @varbox/client\n# или\nyarn add @varbox/client\n# или\npnpm add @varbox/client`,
    },
    {
      title: 'Инициализация',
      desc: 'Создайте клиент с вашим API ключом',
      lang: 'typescript',
      code: `import { VarBox } from '@varbox/client'\n\nconst vb = new VarBox({\n  apiKey: process.env.VARBOX_API_KEY,\n  project: 'my-project',\n  env: 'production'\n})`,
    },
    {
      title: 'Получение переменных',
      desc: 'Загрузите все переменные одним запросом',
      lang: 'typescript',
      code: `// Получить все переменные\nconst config = await vb.getAll()\nconsole.log(config.DATABASE_URL)\n\n// Получить одну переменную\nconst url = await vb.get('DATABASE_URL')\n\n// С типизацией\nconst port = await vb.get<number>('PORT')`,
    },
  ],
  'rest-api': [
    {
      title: 'Базовый URL',
      desc: 'Все запросы отправляются на этот адрес',
      lang: 'bash',
      code: `https://api.varbox.io/v2`,
    },
    {
      title: 'Получить переменные',
      desc: 'GET /variables — список всех переменных проекта',
      lang: 'bash',
      code: `curl -X GET \\\n  "https://api.varbox.io/v2/variables" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "X-Project: my-project" \\\n  -H "X-Env: production"`,
    },
    {
      title: 'Ответ API',
      desc: 'Пример успешного ответа',
      lang: 'json',
      code: `{\n  "ok": true,\n  "data": [\n    {\n      "id": "var_abc123",\n      "key": "DATABASE_URL",\n      "type": "secret",\n      "version": 5,\n      "updatedAt": "2024-01-15T10:30:00Z"\n    }\n  ],\n  "meta": { "total": 47, "env": "production" }\n}`,
    },
    {
      title: 'Создать переменную',
      desc: 'POST /variables',
      lang: 'bash',
      code: `curl -X POST \\\n  "https://api.varbox.io/v2/variables" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "key": "NEW_VAR",\n    "value": "hello",\n    "type": "string",\n    "env": "production"\n  }'`,
    },
  ],
  sdk: [
    {
      title: 'TypeScript SDK',
      desc: 'Полностью типизированный клиент',
      lang: 'typescript',
      code: `import { VarBox, type VarConfig } from '@varbox/client'\n\ninterface MyConfig extends VarConfig {\n  DATABASE_URL: string\n  PORT: number\n  DEBUG: boolean\n}\n\nconst config = await vb.getAll<MyConfig>()\n// config.DATABASE_URL — string ✓\n// config.PORT — number ✓\n// config.DEBUG — boolean ✓`,
    },
    {
      title: 'Подписка на изменения',
      desc: 'Реал-тайм обновления переменных',
      lang: 'typescript',
      code: `// Подписаться на изменение переменной\nvb.watch('FEATURE_FLAG', (newValue, oldValue) => {\n  console.log(\`Изменено: \${oldValue} → \${newValue}\`)\n  updateFeatureFlag(newValue)\n})\n\n// Подписаться на все изменения\nvb.watchAll((changes) => {\n  console.log('Изменено', changes.length, 'переменных')\n})`,
    },
  ],
  auth: [
    {
      title: 'API ключи',
      desc: 'Создайте ключ в панели управления',
      lang: 'bash',
      code: `# Передавайте ключ в заголовке Authorization\ncurl -H "Authorization: Bearer vbx_live_xxxxxxxxxxxx" \\\n  https://api.varbox.io/v2/variables`,
    },
    {
      title: 'Переменные окружения',
      desc: 'Рекомендуемый способ хранения ключа',
      lang: 'typescript',
      code: `// .env\nVARBOX_API_KEY=vbx_live_xxxxxxxxxxxx\n\n// Код\nconst vb = new VarBox({\n  apiKey: process.env.VARBOX_API_KEY, // никогда не хардкодьте ключи!\n})`,
    },
  ],
  webhooks: [
    {
      title: 'Настройка Webhook',
      desc: 'Получайте уведомления при изменении переменных',
      lang: 'json',
      code: `POST /webhooks\n{\n  "url": "https://myapp.com/hooks/varbox",\n  "events": ["variable.updated", "variable.created", "variable.deleted"],\n  "secret": "my-webhook-secret"\n}`,
    },
    {
      title: 'Обработка события',
      desc: 'Пример обработчика на Node.js / Express',
      lang: 'typescript',
      code: `app.post('/hooks/varbox', (req, res) => {\n  const sig = req.headers['x-varbox-signature']\n  const valid = vb.verifyWebhook(req.body, sig)\n\n  if (!valid) return res.status(401).send('Invalid')\n\n  const { event, data } = req.body\n  if (event === 'variable.updated') {\n    console.log(\`Обновлено: \${data.key}\`)\n  }\n  res.json({ ok: true })\n})`,
    },
  ],
  versioning: [
    {
      title: 'Откат версии',
      desc: 'Вернитесь к любой предыдущей версии',
      lang: 'typescript',
      code: `// Получить историю версий\nconst history = await vb.getHistory('DATABASE_URL')\n// [{ version: 5, value: '...', updatedAt: '...' }, ...]\n\n// Откатить к версии\nawait vb.rollback('DATABASE_URL', 3)\nconsole.log('Откат к v3 выполнен!')`,
    },
    {
      title: 'Сравнение версий',
      desc: 'Сравните две версии переменной',
      lang: 'typescript',
      code: `const diff = await vb.diff('DATABASE_URL', {\n  from: 3,\n  to: 5\n})\nconsole.log(diff.changes)\n// [{ field: 'value', from: 'old-host', to: 'new-host' }]`,
    },
  ],
};

export default function Docs() {
  const [activeSection, setActiveSection] = useState('quickstart');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const examples = codeExamples[activeSection] || [];

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Docs sidebar */}
      <div style={{
        width: 220,
        borderRight: '1px solid var(--vb-border)',
        background: 'var(--vb-surface)',
        overflow: 'auto',
        padding: '20px 12px',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 11, color: 'var(--vb-text3)', fontFamily: 'IBM Plex Mono', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, padding: '0 6px' }}>
          Документация
        </div>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '8px 10px',
              borderRadius: 7,
              border: 'none',
              background: activeSection === s.id ? 'var(--vb-green-dim)' : 'transparent',
              color: activeSection === s.id ? 'var(--vb-green)' : 'var(--vb-text2)',
              fontSize: 13.5,
              cursor: 'pointer',
              marginBottom: 2,
              fontFamily: 'IBM Plex Sans',
              textAlign: 'left',
              transition: 'all 0.15s',
            }}>
            <Icon name={s.icon} size={15} />
            {s.label}
          </button>
        ))}

        <div style={{ marginTop: 24, padding: '14px 12px', background: 'var(--vb-green-dim)', borderRadius: 8, border: '1px solid rgba(34,197,94,0.2)' }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--vb-green)', marginBottom: 6 }}>API Reference</div>
          <div style={{ fontSize: 12, color: 'var(--vb-text3)', lineHeight: 1.5 }}>Полная спецификация OpenAPI 3.0</div>
          <button style={{
            marginTop: 10, fontSize: 12, padding: '5px 10px', borderRadius: 6,
            border: '1px solid rgba(34,197,94,0.4)', background: 'transparent', color: 'var(--vb-green)',
            cursor: 'pointer', fontFamily: 'IBM Plex Sans', display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <Icon name="ExternalLink" size={11} />
            Открыть
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 36 }}>
        <div style={{ maxWidth: 760 }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 12, fontFamily: 'IBM Plex Mono', color: 'var(--vb-green)', marginBottom: 8, letterSpacing: '0.06em' }}>
              ДОКУМЕНТАЦИЯ
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--vb-text)', marginBottom: 10 }}>
              {sections.find(s => s.id === activeSection)?.label}
            </h1>
            <p style={{ fontSize: 14.5, color: 'var(--vb-text3)', lineHeight: 1.7 }}>
              {activeSection === 'quickstart' && 'Начните работу с VarBox за несколько минут. Установите SDK, получите API ключ и загрузите ваши первые переменные.'}
              {activeSection === 'rest-api' && 'REST API предоставляет полный доступ к управлению переменными. Используйте любой HTTP клиент или инструмент.'}
              {activeSection === 'sdk' && 'TypeScript SDK с полной типизацией, реал-тайм подписками и удобным API для интеграции в любой проект.'}
              {activeSection === 'auth' && 'VarBox использует API ключи для авторизации. Ключи создаются в панели управления и передаются в заголовке запроса.'}
              {activeSection === 'webhooks' && 'Webhooks позволяют получать уведомления в реал-тайм при любых изменениях переменных в вашем проекте.'}
              {activeSection === 'versioning' && 'Каждое изменение переменной создаёт новую версию. Откатывайтесь к любой точке в истории одной командой.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {examples.map((ex, i) => (
              <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
                <div style={{ marginBottom: 10 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--vb-text)', marginBottom: 4 }}>{ex.title}</h3>
                  <p style={{ fontSize: 13.5, color: 'var(--vb-text3)' }}>{ex.desc}</p>
                </div>

                <div style={{
                  background: 'var(--vb-surface)',
                  border: '1px solid var(--vb-border)',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 16px',
                    borderBottom: '1px solid var(--vb-border)',
                    background: 'var(--vb-surface2)',
                  }}>
                    <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 12, color: 'var(--vb-text3)' }}>{ex.lang}</span>
                    <button
                      onClick={() => handleCopy(ex.code, `${i}-${ex.lang}`)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        fontSize: 12, padding: '4px 10px', borderRadius: 5,
                        border: '1px solid var(--vb-border)', background: 'transparent',
                        color: copiedCode === `${i}-${ex.lang}` ? 'var(--vb-green)' : 'var(--vb-text3)',
                        cursor: 'pointer', fontFamily: 'IBM Plex Sans', transition: 'color 0.15s',
                      }}>
                      <Icon name={copiedCode === `${i}-${ex.lang}` ? 'Check' : 'Copy'} size={12} />
                      {copiedCode === `${i}-${ex.lang}` ? 'Скопировано!' : 'Копировать'}
                    </button>
                  </div>
                  <pre style={{
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 13,
                    color: 'var(--vb-text2)',
                    padding: '16px',
                    margin: 0,
                    overflowX: 'auto',
                    lineHeight: 1.7,
                    whiteSpace: 'pre',
                  }}>{ex.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
