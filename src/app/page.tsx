import { CatalogClient } from '@/components/CatalogClient';
import { databaseActions } from '@/lib/mockDatabase';

export default function CatalogPage() {
  const videos = databaseActions.getAll();

  return <CatalogClient videos={videos} />;
}
