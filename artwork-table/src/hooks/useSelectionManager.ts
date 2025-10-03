import { useState, useCallback } from 'react';
import type { Artwork } from '../types/artwork';

export function useSelectionManager() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);

  const updateSelection = useCallback((newSelection: Artwork[], allArtworks: Artwork[]) => {
    setSelectedArtworks(newSelection);
    
    const newSelectedIds = new Set(selectedIds);
    const newSelectionIds = new Set(newSelection.map(a => a.id));
    
    allArtworks.forEach(artwork => {
      if (newSelectionIds.has(artwork.id)) {
        newSelectedIds.add(artwork.id);
      } else {
        newSelectedIds.delete(artwork.id);
      }
    });
    
    setSelectedIds(newSelectedIds);
  }, [selectedIds]);

  const restoreSelection = useCallback((artworks: Artwork[]) => {
    const restored = artworks.filter(artwork => selectedIds.has(artwork.id));
    setSelectedArtworks(restored);
  }, [selectedIds]);

  const addSelections = useCallback((ids: number[]) => {
    const newSelectedIds = new Set(selectedIds);
    ids.forEach(id => newSelectedIds.add(id));
    setSelectedIds(newSelectedIds);
  }, [selectedIds]);

  return {
    selectedIds,
    selectedArtworks,
    selectionCount: selectedIds.size,
    updateSelection,
    restoreSelection,
    addSelections,
    setSelectedArtworks
  };
}