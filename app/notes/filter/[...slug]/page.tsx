import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type NotesFilterPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesFilterPage({
  params,
}: NotesFilterPageProps) {
  const { slug = ['all'] } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  const notesResponse = await fetchNotes(1, '', tag);

  return <NotesClient initialData={notesResponse} filterTag={tag} />;
}
