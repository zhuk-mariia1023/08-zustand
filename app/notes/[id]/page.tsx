import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const noteId = await params;
  const note = await fetchNoteById(Number(noteId));

  const title = note?.title ?? 'Note not found';
  const description =
    note?.content?.slice(0, 160) ?? 'No description available for this note.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.app/notes/${params}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub App Open Graph Image',
        },
      ],
    },
  };
}

export default async function NoteDetails({ params }: PageProps) {
  const noteId = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(Number(noteId)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
