'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';
import type { Tag } from '@/types/note';

const allowedTags = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
] as const;
type AllowedTag = (typeof allowedTags)[number];

type TagsMenuProps = {
  tags: Tag[];
};

const TagsMenu = ({ tags }: TagsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(prev => !prev);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredTags = tags.filter(tag =>
    allowedTags.includes(tag.name as AllowedTag)
  );

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/notes/filter/all"
              onClick={toggle}
              className={css.menuLink}
            >
              All notes
            </Link>
          </li>
          {filteredTags.map(tag => (
            <li key={tag.id} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag.name}`}
                onClick={toggle}
                className={css.menuLink}
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
