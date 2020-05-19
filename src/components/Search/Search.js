
import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const Search = () => {
  const [visibleInput, setVisibleInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputElement = useRef(null);
  const cx = classNames.bind(styles);

  const buttonClass = cx({
    'search-button': true,
    close: visibleInput,
  });

  const inputClass = cx({
    'input-search': true,
    'search-active': visibleInput
    // square: visibleInput,
  });

  const suggestionsClass = cx({
    'search-suggestions': true,
    'search-active': visibleInput
  });

  const handleClick = async () => {
    setSearchValue('');
    await setVisibleInput(!visibleInput);
    inputElement.current.focus();
  };

  const search = (
    <div className={styles['search-container']}>
      <form className={styles['search-form']}>
        <input
          type="text"
          ref={inputElement}
          className={inputClass}
        />
        <img
          id="btn"
          className={styles['btn-search']}
          src="./media/search.png"
          alt=""
          onClick={handleClick}
        />
      </form>
      <ul className={suggestionsClass}>
        <li className={styles['suggestion-item']}>option 1</li>
        <li className={styles['suggestion-item']}>option 2</li>
        <li className={styles['suggestion-item']}>option 3</li>
        <li className={styles['suggestion-item']}>option 4</li>
      </ul>
    </div>
  );

  return search;
};

export default Search;
