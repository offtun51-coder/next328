import { bands } from '../data/bands';
import BandExplorer from '../components/BandExplorer';

export default function FavoritePage() {
  return <BandExplorer bands={bands} />;
}