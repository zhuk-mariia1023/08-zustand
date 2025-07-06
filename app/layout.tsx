import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
