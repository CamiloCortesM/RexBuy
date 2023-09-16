import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { Navbar,SideMenu } from '../ui';

type Props = {
  children       : ReactNode;
  title          : string;
  pageDescription: string;
  imageFullUrl?  : string;
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
          margin: '60px auto 20px',
          padding: '20px 0',
        }}
      >
        {children}
      </main>
      <footer>{/* TODO: mi custom footer */}</footer>
    </>
  );
};
