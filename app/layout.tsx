import './globals.css';
import { Roboto } from 'next/font/google';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import type { Metadata } from 'next';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub — your notes in one place',
  description: 'Create, manage and filter notes easily with NoteHub.',
  openGraph: {
    title: 'NoteHub — your notes in one place',
    description: 'Create, manage and filter notes easily with NoteHub.',
    url: 'https://notehub.app',
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

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <div className="page-body">
          <TanStackProvider>
            <Header />
            <main className="page-main">
              {children}
              {modal}
            </main>
            <Footer />
          </TanStackProvider>
        </div>
      </body>
    </html>
  );
}
