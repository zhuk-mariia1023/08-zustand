'use client';

import css from './NotePreview.module.css';
import type { Note } from '@/types/note';

type NotePreviewProps = {
  note: Note;
  onClose: () => void;
};

export default function NotePreview({ note, onClose }: NotePreviewProps) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.backBtn} onClick={onClose}>
            Go back
          </button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
