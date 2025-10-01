import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

interface ApiResponse {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
  data: any[];
}

export default function ArtworkTable() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [rowsPerPage] = useState(12);
  const [rowsToSelect, setRowsToSelect] = useState<number | null>(null);
  
  // Track selected and deselected IDs across pages
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [deselectedIds, setDeselectedIds] = useState<Set<number>>(new Set());
  
  const overlayPanelRef = useRef<OverlayPanel>(null);

  // Fetch data from API
  const fetchArtworks = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
      const data: ApiResponse = await response.json();
      
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
      
      // Restore selections for current page based on selectedIds and deselectedIds
      const currentPageSelections = formattedData.filter(artwork => 
        selectedIds.has(artwork.id) && !deselectedIds.has(artwork.id)
      );
      setSelectedArtworks(currentPageSelections);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks(currentPage);
  }, [currentPage]);

  // Handle page change
  const onPageChange = (event: any) => {
    setCurrentPage(event.page + 1);
  };

  // Handle selection change
  const onSelectionChange = (e: any) => {
    const newSelection = e.value as Artwork[];
    setSelectedArtworks(newSelection);
    
    // Update selectedIds and deselectedIds
    const newSelectedIds = new Set(selectedIds);
    const newDeselectedIds = new Set(deselectedIds);
    
    const currentPageIds = new Set(artworks.map(a => a.id));
    const newSelectionIds = new Set(newSelection.map(a => a.id));
    
    // For each row in current page
    artworks.forEach(artwork => {
      if (newSelectionIds.has(artwork.id)) {
        // Row is selected
        newSelectedIds.add(artwork.id);
        newDeselectedIds.delete(artwork.id);
      } else {
        // Row is not selected
        if (selectedIds.has(artwork.id)) {
          // Was previously selected, now deselected
          newDeselectedIds.add(artwork.id);
        }
        newSelectedIds.delete(artwork.id);
      }
    });
    
    setSelectedIds(newSelectedIds);
    setDeselectedIds(newDeselectedIds);
  };

  // Handle overlay panel submit
  const handleSelectRows = async () => {
    if (rowsToSelect === null || rowsToSelect <= 0) return;
    
    overlayPanelRef.current?.hide();
    setLoading(true);
    
    const newSelectedIds = new Set(selectedIds);
    const newDeselectedIds = new Set(deselectedIds);
    let remainingRows = rowsToSelect;
    let page = currentPage;
    
    try {
      while (remainingRows > 0 && page <= Math.ceil(totalRecords / rowsPerPage)) {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
        const data: ApiResponse = await response.json();
        
        const rowsToSelectInPage = Math.min(remainingRows, data.data.length);
        
        for (let i = 0; i < rowsToSelectInPage; i++) {
          const id = data.data[i].id;
          newSelectedIds.add(id);
          newDeselectedIds.delete(id);
        }
        
        remainingRows -= rowsToSelectInPage;
        page++;
      }
      
      setSelectedIds(newSelectedIds);
      setDeselectedIds(newDeselectedIds);
      
      // Update current page selections
      const currentPageSelections = artworks.filter(artwork => 
        newSelectedIds.has(artwork.id) && !newDeselectedIds.has(artwork.id)
      );
      setSelectedArtworks(currentPageSelections);
    } catch (error) {
      console.error('Error selecting rows:', error);
    } finally {
      setLoading(false);
      setRowsToSelect(null);
    }
  };

  // Custom header with selection count and chevron
  const header = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
        {selectedIds.size - deselectedIds.size} selected
      </span>
      <Button
        icon="pi pi-chevron-down"
        className="p-button-text p-button-sm"
        onClick={(e) => overlayPanelRef.current?.toggle(e)}
        style={{ minWidth: 'auto', padding: '4px 8px' }}
      />
      <OverlayPanel ref={overlayPanelRef}>
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label htmlFor="rows-input">Select rows:</label>
          <InputNumber
            id="rows-input"
            value={rowsToSelect}
            onValueChange={(e) => setRowsToSelect(e.value)}
            placeholder="Number of rows"
            min={1}
          />
          <Button
            label="Submit"
            onClick={handleSelectRows}
            disabled={!rowsToSelect || rowsToSelect <= 0}
          />
        </div>
      </OverlayPanel>
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Artwork Collection</h1>
      <div className="card">
        {loading ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '400px' 
          }}>
            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
          </div>
        ) : (
          <DataTable
            value={artworks}
            selection={selectedArtworks}
            onSelectionChange={onSelectionChange}
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
            <Column
              field="title"
              header="Title"
              style={{ width: '20%' }}
            />
            <Column
              field="place_of_origin"
              header="Place of Origin"
              style={{ width: '15%' }}
            />
            <Column
              field="artist_display"
              header="Artist"
              style={{ width: '25%' }}
            />
            <Column
              field="inscriptions"
              header="Inscriptions"
              style={{ width: '20%' }}
            />
            <Column
              field="date_start"
              header="Date Start"
              style={{ width: '10%' }}
            />
            <Column
              field="date_end"
              header="Date End"
              style={{ width: '10%' }}
            />
          </DataTable>
        )}
      </div>
    </div>
  );
}