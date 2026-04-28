import { useState } from 'react';
import Icon from '@/components/ui/icon';
import VarsTable, { type VarItem } from '@/components/dashboard/VarsTable';
import HistoryTab from '@/components/dashboard/HistoryTab';
import VarDetailPanel from '@/components/dashboard/VarDetailPanel';
import AddVarModal from '@/components/dashboard/AddVarModal';

const initialVars: VarItem[] = [
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

export default function Dashboard() {
  const [vars, setVars] = useState(initialVars);
  const [selectedVar, setSelectedVar] = useState<VarItem | null>(null);
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
    const newVar: VarItem = {
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
          <VarsTable
            filtered={filtered}
            selectedVar={selectedVar}
            showSecret={showSecret}
            editingId={editingId}
            editValue={editValue}
            envFilter={envFilter}
            onSelectVar={setSelectedVar}
            onToggleSecret={id => setShowSecret(s => ({ ...s, [id]: !s[id] }))}
            onStartEdit={(id, value) => { setEditingId(id); setEditValue(value); }}
            onSave={handleSave}
            onEditValueChange={setEditValue}
            onEnvFilterChange={setEnvFilter}
          />
        )}

        {activeTab === 'history' && (
          <HistoryTab history={history} />
        )}
      </div>

      {/* Right detail panel */}
      {selectedVar && (
        <VarDetailPanel
          selectedVar={selectedVar}
          onClose={() => setSelectedVar(null)}
          onEdit={(id, value) => { setEditingId(id); setEditValue(value); }}
        />
      )}

      {/* Add modal */}
      {showAddModal && (
        <AddVarModal
          newKey={newKey}
          newValue={newValue}
          newType={newType}
          onKeyChange={setNewKey}
          onValueChange={setNewValue}
          onTypeChange={setNewType}
          onAdd={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
