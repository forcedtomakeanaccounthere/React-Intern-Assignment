import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { fetchArtworks, fetchArtworksForSelection } from '../services/artworkService';
import type { Artwork } from '../types/artwork';
import { useSelectionManager } from '../hooks/useSelectionManager';
import LoadingSpinner from './LoadingSpinner';
import SelectionHeader from './SelectionHeader';

export default function ArtworkTable() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [rowsToSelect, setRowsToSelect] = useState<number | null>(null);
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const rowsPerPage = 12;

  const {
    selectedIds,
    selectedArtworks,
    selectionCount,
    updateSelection,
    restoreSelection,
    addSelections,
    setSelectedArtworks
  } = useSelectionManager();

  useEffect(() => {
    loadArtworks(currentPage);
  }, [currentPage]);

  const loadArtworks = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchArtworks(page);
      
      const formattedData: Artwork[] = data.data.map((item: any) => ({
        id: item.id,
        title: item.title || 'N/A',
        place_of_origin: item.place_of_origin || 'N/A',
        artist_display: item.artist_display || 'N/A',
        inscriptions: item.inscriptions || 'N/A',
        date_start: item.date_start || 0,
        date_end: item.date_end || 0,
      }));
      
      setArtworks(formattedData);
      setTotalRecords(data.pagination.total);
      restoreSelection(formattedData);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (event: any) => {
    setCurrentPage(event.page + 1);
  };

  const onSelectionChange = (e: any) => {
    updateSelection(e.value, artworks);
  };

  const handleSelectRows = async (count: number) => {
    setLoading(true);
    try {
      const ids = await fetchArtworksForSelection(currentPage, count);
      addSelections(ids);
      
      // Update current page selections
      const currentPageSelections = artworks.filter(artwork => 
        selectedIds.has(artwork.id) || ids.includes(artwork.id)
      );
      setSelectedArtworks(currentPageSelections);
    } catch (error) {
      console.error('Error selecting rows:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (rowsToSelect && rowsToSelect > 0) {
      handleSelectRows(rowsToSelect);
      overlayPanelRef.current?.hide();
      setRowsToSelect(null);
    }
  };

  const titleHeader = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Button
        icon="pi pi-chevron-down"
        className="p-button-text p-button-sm"
        onClick={(e) => overlayPanelRef.current?.toggle(e)}
        style={{ 
          minWidth: 'auto', 
          padding: '2px -1px',
          backgroundColor: '#e21515ff',
          color: '#fff',
          border: 'none'
        }}
      />
      <span>Title</span>
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

  const header = <SelectionHeader selectionCount={selectionCount} />;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="card">
      <DataTable
        value={artworks}
        selection={selectedArtworks}
        onSelectionChange={onSelectionChange}
        selectionMode="multiple"
        dataKey="id"
        paginator
        rows={rowsPerPage}
        totalRecords={totalRecords}
        lazy
        first={(currentPage - 1) * rowsPerPage}
        onPage={onPageChange}
        header={header}
        tableStyle={{ minWidth: '60rem' }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: '3rem' }}
        />
        <Column field="title" header={titleHeader} style={{ width: '20%' }} />
        <Column field="place_of_origin" header="Place of Origin" style={{ width: '15%' }} />
        <Column field="artist_display" header="Artist" style={{ width: '25%' }} />
        <Column field="inscriptions" header="Inscriptions" style={{ width: '20%' }} />
        <Column field="date_start" header="Date Start" style={{ width: '10%' }} />
        <Column field="date_end" header="Date End" style={{ width: '10%' }} />
      </DataTable>
    </div>
  );
}