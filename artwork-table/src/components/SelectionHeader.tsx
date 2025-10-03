import { useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

interface SelectionHeaderProps {
  selectionCount: number;
  onSelectRows: (count: number) => void;
}

export default function SelectionHeader({ selectionCount, onSelectRows }: SelectionHeaderProps) {
  const [rowsToSelect, setRowsToSelect] = useState<number | null>(null);
  const overlayPanelRef = useRef<OverlayPanel>(null);

  const handleSubmit = () => {
    if (rowsToSelect && rowsToSelect > 0) {
      onSelectRows(rowsToSelect);
      overlayPanelRef.current?.hide();
      setRowsToSelect(null);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
        {selectionCount} selected
      </span>
      <Button
        icon="pi pi-chevron-down"
        className="p-button-text p-button-sm"
        onClick={(e) => overlayPanelRef.current?.toggle(e)}
        style={{ minWidth: 'auto', padding: '4px 8px' }}
      />
      <OverlayPanel ref={overlayPanelRef}>
        <div style={{ 
          padding: '12px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px' 
        }}>
          <label htmlFor="rows-input">Select rows:</label>
          <InputNumber
            id="rows-input"
            value={rowsToSelect}
            onValueChange={(e) => setRowsToSelect(e.value ?? null)}
            placeholder="Number of rows"
            min={1}
          />
          <Button
            label="Submit"
            onClick={handleSubmit}
            disabled={!rowsToSelect || rowsToSelect <= 0}
          />
        </div>
      </OverlayPanel>
    </div>
  );
}