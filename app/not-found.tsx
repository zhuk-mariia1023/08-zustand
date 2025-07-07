import css from './Home.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found — NoteHub',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: 'Page Not Found — NoteHub',
    description: 'Sorry, the page you are looking for does not exist.',
    url: 'https://notehub.app/not-found',
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

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
