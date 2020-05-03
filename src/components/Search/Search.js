
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
    'search-input': true,
    square: visibleInput,
  });

  const handleClick = async () => {
    setSearchValue('');
    await setVisibleInput(!visibleInput);
    inputElement.current.focus();
  };

  return (
    <form className={styles['search-form']}>
      <input type="text" 
        value={searchValue}
        ref={inputElement}
        className={inputClass}
        disabled={!visibleInput}
        onChange={(event) => setSearchValue(event.target.value)}
        onTransitionEnd={(event) => console.log(event)}
      />
      <button type="reset" className={buttonClass} onClick={handleClick}></button>
    </form>
  );
};

export default Search;
