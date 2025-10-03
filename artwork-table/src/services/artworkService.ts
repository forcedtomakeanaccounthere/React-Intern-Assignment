import type { ApiResponse } from '../types/artwork';

const API_BASE_URL = 'https://api.artic.edu/api/v1';

export async function fetchArtworks(page: number): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/artworks?page=${page}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch artworks: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchArtworksForSelection(
  startPage: number, 
  count: number
): Promise<number[]> {
  const ids: number[] = [];
  let page = startPage;
  let remaining = count;
  
  while (remaining > 0) {
    const data = await fetchArtworks(page);
    const idsToAdd = data.data
      .slice(0, Math.min(remaining, data.data.length))
      .map((item: any) => item.id);
    
    ids.push(...idsToAdd);
    remaining -= idsToAdd.length;
    page++;
    
    if (page > data.pagination.total_pages) break;
  }
  
  return ids;
}