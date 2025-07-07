import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const noteId = Number(params.id);
  const note = await fetchNoteById(noteId);

  const title = note?.title ?? 'Note not found';
  const description =
    note?.content?.slice(0, 160) ?? 'No description available for this note.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.app/notes/${params.id}`,
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
  const noteId = Number(params.id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
