// @flow strict
import React from 'react';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import ru from 'moment/locale/ru';
import { Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './Feed.module.scss';

type Props = {
  edges: Edges
};

moment.locale('ru');

const Feed = ({ edges }: Props) => (
  <div className={styles['feed']}>
    {edges.map((edge) => (
      <div className={styles['feed__item']} key={edge.node.fields.slug}>
        <div className={styles['feed__item-meta']}>
          <time className={styles['feed__item-meta-time']} dateTime={moment(edge.node.frontmatter.date).format('MMMM D, YYYY')}>
            {moment(edge.node.frontmatter.date).format('MMMM YYYY')}
          </time>
          <span className={styles['feed__item-meta-divider']} />
          <span className={styles['feed__item-meta-category']}>
            {edge.node.frontmatter.category.map((category, i) => (
              <Link to={edge.node.fields.categorySlug[i]} className={styles['feed__item-meta-category-link']}>{category}</Link>
            )).reduce((prev, curr) => [prev, ', ', curr])}
          </span>
        </div>
        <h2 className={styles['feed__item-title']}>
          <Link className={styles['feed__item-title-link']} to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
        </h2>
        <p className={styles['feed__item-description']}>{edge.node.frontmatter.description}</p>
        <Link className={styles['feed__item-readmore']} to={edge.node.fields.slug}>Читать</Link>
      </div>
    ))}
  </div>
);

export default Feed;
