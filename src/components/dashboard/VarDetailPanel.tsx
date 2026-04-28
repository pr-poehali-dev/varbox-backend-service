import Icon from '@/components/ui/icon';
import { typeColor, envColor, type VarItem } from './VarsTable';

interface VarDetailPanelProps {
  selectedVar: VarItem;
  onClose: () => void;
  onEdit: (id: number, value: string) => void;
}

export default function VarDetailPanel({ selectedVar, onClose, onEdit }: VarDetailPanelProps) {
  return (
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
          onClick={onClose}
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
            onClick={() => { onEdit(selectedVar.id, selectedVar.value); onClose(); }}
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
  );
}
