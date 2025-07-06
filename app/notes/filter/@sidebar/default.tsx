import Link from 'next/link';
import css from './SidebarNotes.module.css';

const tags = [
  { id: '1', name: 'Work' },
  { id: '2', name: 'Personal' },
  { id: '3', name: 'Meeting' },
  { id: '4', name: 'Shopping' },
  { id: '5', name: 'Todo' },
];

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/All" className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map(tag => (
        <li key={tag.id} className={css.menuItem}>
          <Link href={`/notes/filter/${tag.name}`} className={css.menuLink}>
            {tag.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
