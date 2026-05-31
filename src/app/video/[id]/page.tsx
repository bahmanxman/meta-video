import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { VideoPackageDetail } from '@/components/VideoPackageDetail';
import { databaseActions } from '@/lib/mockDatabase';

type VideoPackagePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: VideoPackagePageProps): Promise<Metadata> {
  const { id } = await params;
  const video = databaseActions.getById(id);

  if (!video) {
    return { title: 'Package not found · Meta Video' };
  }

  return {
    title: `${video.matchName} · Meta Video`,
    description: video.title,
  };
}

export default async function VideoPackagePage({ params }: VideoPackagePageProps) {
  const { id } = await params;
  const video = databaseActions.getById(id);

  if (!video) {
    notFound();
  }

  return <VideoPackageDetail video={video} />;
}
