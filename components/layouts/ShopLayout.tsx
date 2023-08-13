import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { Navbar,SideMenu } from '../ui';

interface Props {
  children: ReactNode;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: '70px auto',
          maxWidth: '1440px',
          padding: '20px 10px',
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer>{/* TODO: mi custom footer */}</footer>
    </>
  );
};
