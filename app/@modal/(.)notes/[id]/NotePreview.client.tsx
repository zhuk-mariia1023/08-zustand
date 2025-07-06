'use client';

import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

export default function NotePreviewClient() {
  const { id } = useParams();
  const router = useRouter();

  const noteId = Number(id);
  const closeModal = () => router.back();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={closeModal}>
      {isLoading && <p>Loading note...</p>}
      {isError && <p>Error loading note: {(error as Error).message}</p>}
      {data && <NotePreview note={data} onClose={closeModal} />}
    </Modal>
  );
}
