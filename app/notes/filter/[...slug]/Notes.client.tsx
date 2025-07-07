'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Link from 'next/link';

import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';

import { fetchNotes } from '@/lib/api';
import type { Note } from '@/types/note';

import css from './NotesPage.module.css';

type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

type NotesClientProps = {
  initialData: NotesResponse;
  filterTag?: string;
};

export default function NotesClient({
  initialData,
  filterTag,
}: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ['notes', debouncedQuery, page, filterTag],
    queryFn: () => fetchNotes(page, debouncedQuery, filterTag),
    placeholderData: keepPreviousData,
    initialData: debouncedQuery === '' && page === 1 ? initialData : undefined,
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={handleSearch} />
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {!isLoading && !isError && (
        <>
          <NoteList notes={data?.notes ?? []} />

          {data?.totalPages && data.totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
