import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NewNote } from '@/types/note';

const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteState = {
  draft: NewNote;
  setDraft: (note: Partial<NewNote>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteState>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note =>
        set(state => ({
          draft: {
            ...state.draft,
            ...note,
          },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
      partialize: state => ({ draft: state.draft }),
    }
  )
);

export { initialDraft };
