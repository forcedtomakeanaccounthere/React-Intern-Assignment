interface SelectionHeaderProps {
  selectionCount: number;
  onSelectRows: (count: number) => void;
}

export default function SelectionHeader({ selectionCount }: Omit<SelectionHeaderProps, 'onSelectRows'>) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
        {selectionCount} selected
      </span>
    </div>
  );
}