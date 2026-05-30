import { CatalogClient } from '@/components/CatalogClient';
import { databaseActions } from '@/lib/mockDatabase';

export default function CatalogPage() {
  const videos = databaseActions.getAll();

  console.log('videos', videos);

  return <CatalogClient videos={videos} />;
}
