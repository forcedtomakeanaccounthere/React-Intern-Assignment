import ArtworkTable from './components/ArtworkTable';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Artwork Collection</h1>
      <ArtworkTable />
    </div>
  );
}