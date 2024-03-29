// @flow strict
import React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import type { Node as ReactNode } from 'react';
import { useSiteMetadata } from '../../hooks';
import styles from './Layout.module.scss';
import Footer from './Footer';
import Search from '../Search/Search';

type Props = {
  children: ReactNode,
  title: string,
  description?: string,
  socialImage? :string
};

const Layout = ({
  children,
  title,
  description,
  socialImage
}: Props) => {
  const { author, url } = useSiteMetadata();
  const metaImage = socialImage != null ? socialImage : author.photo;
  const metaImageUrl = url + withPrefix(metaImage);

  return (
    <>
      <div className={styles.layout}>
        <Search />
        <Helmet>
          <html lang="ru" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:site_name" content={title} />
          <meta property="og:image" content={metaImageUrl} />
          <meta name="google-site-verification" content="tjpAzG6DzAVzAZudOnLkqNcGUSWXMg8lnzfd_Dxa1vU" />
          <meta name="yandex-verification" content="dc9405a4061fd035" />
        </Helmet>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
