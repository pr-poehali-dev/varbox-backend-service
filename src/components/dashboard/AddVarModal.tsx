import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { typeColor } from './VarsTable';

interface AddVarModalProps {
  newKey: string;
  newValue: string;
  newType: string;
  onKeyChange: (v: string) => void;
  onValueChange: (v: string) => void;
  onTypeChange: (v: string) => void;
  onAdd: () => void;
  onClose: () => void;
}

export default function AddVarModal({
  newKey,
  newValue,
  newType,
  onKeyChange,
  onValueChange,
  onTypeChange,
  onAdd,
  onClose,
}: AddVarModalProps) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div className="animate-fade-in-scale" style={{
        background: 'var(--vb-surface)',
        border: '1px solid var(--vb-border)',
        borderRadius: 14,
        padding: 28,
        width: 440,
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--vb-text)' }}>Новая переменная</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--vb-text3)', cursor: 'pointer' }}>
            <Icon name="X" size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: 'var(--vb-text3)', display: 'block', marginBottom: 6 }}>Ключ</label>
            <input
              placeholder="MY_VARIABLE"
              value={newKey}
              onChange={e => onKeyChange(e.target.value)}
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
              onChange={e => onValueChange(e.target.value)}
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
                  onClick={() => onTypeChange(t)}
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
            <button onClick={onClose} style={{
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
            <button onClick={onAdd} style={{
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
  );
}
