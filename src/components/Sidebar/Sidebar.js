// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
// import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import { useSiteMetadata, useTagsList } from '../../hooks';

type Props = {
  isIndex?: boolean,
};

const renderTags = () => {
  const tags = useTagsList();
  return (
    <aside>
      <h5>Метки</h5>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        {tags.map((tag) => (
          <li key={tag.fieldValue} style={{ display: 'inline-block', padding: 0, margin: 0 }}>
            <Link to={`/tag/${kebabCase(tag.fieldValue)}/`} style={{ fontSize: `${tag.totalCount + 9}pt`, marginRight: 3 }}>
              {tag.fieldValue}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        {/* <Author author={author} isIndex={isIndex} /> */}
        <Menu menu={menu} />
        {/* <Contacts contacts={author.contacts} /> */}
        {renderTags()}
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

export default Sidebar;
