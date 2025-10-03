import ArtworkTable from './components/ArtworkTable';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

export default function App() {
  return (
    <div style={{ padding: '6px' }}>
      <h1>Artwork Collection</h1>
      <h2 style={{ color: 'red' , position: 'sticky', top: '70px'}}>Abhishek Anand - React Internship Assignment</h2>
      <ArtworkTable />
    </div>
  );
}