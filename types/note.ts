export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export type NewNote = {
  title: string;
  content: string;
  tag: string;
};

export type Tag = {
  id: string;
  name: string;
};
