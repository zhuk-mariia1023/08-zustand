import axios from 'axios';
import type { Note, NewNote } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNoteById = async (id: number) => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};

export const fetchNotes = async (
  page: number,
  search = '',
  tag?: string,
  perPage = 12
): Promise<{ notes: Note[]; totalPages: number }> => {
  const params: Record<string, string | number> = { page, perPage };
  if (search.trim()) params.search = search.trim();
  if (tag && tag !== 'all') params.tag = tag;

  const response = await instance.get<{ notes: Note[]; totalPages: number }>(
    '/notes',
    { params }
  );
  return response.data;
};

export const createNote = async (data: NewNote): Promise<Note> => {
  const response = await instance.post<Note>('/notes', data);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await instance.delete<Note>(`/notes/${id}`);
  return response.data;
};
