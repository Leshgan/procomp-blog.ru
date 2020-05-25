
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, navigate } from 'gatsby';
import styles from './Search.module.scss';

const Search = () => {
  const [visibleInput, setVisibleInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const inputElement = useRef(null);
  const wrapper = useRef(null);
  const cx = classNames.bind(styles);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapper.current && !wrapper.current.contains(event.target)) {
        handleClick();
      }
    }

    // Bind the event listener
    if (visibleInput) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visibleInput]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputElement.current.focus();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [visibleInput]);

  const inputClass = cx({
    'input-search': true,
    'search-active': visibleInput
  });

  const suggestionsClass = cx({
    'search-suggestions': true,
    'search-active': visibleInput
  });

  const handleClick = () => {
    setSearchQuery('');
    setSearchResults([]);
    setVisibleInput(!visibleInput);
  };

  const handleSearchInput = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      // const results = getSearchResults(query);
      const results = getResults(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.keyCode === 38) {
      setCursor(cursor > -1 ? cursor - 1 : searchResults.length - 1);
    }
    if (event.keyCode === 40) {
      setCursor((cursor + 1) % searchResults.length);
    }
    if (event.keyCode === 13) {
      // enter pressed
      navigate(searchResults[cursor].link);
    }
  };

  const getResults = (query) => {
    const res = [];
    ['ru', 'en'].forEach(lang => {
      const lunrIndex = window.__LUNR__[lang];
      const searchResults = lunrIndex.index.search(query);
      searchResults.forEach(({ ref }) => {
        res.push(lunrIndex.store[ref]);
      });
    });
    // find the unique ids of the nodes
    return Array.from(new Set(res)); // first 10 results
  };

  const renderSearchResults = () => {
    return searchResults && searchResults.length
      ? (
        <ul className={suggestionsClass}>
          {searchResults.map(({ link, title }, index) => {
            const liClass = cx({
              'suggestion-item': true,
              selected: index === cursor,
            });
            return (
              <li className={liClass} key={link}>
                <Link to={link} className={styles['suggestion-link']}>{title}</Link>
              </li>
            );
          })}
        </ul>
      )
      : null;
  };

  const search = (
    <div
      className={styles['search-container']}
      ref={wrapper}
    >
      <form
        className={styles['search-form']}
        onSubmit={(event) => { event.preventDefault(); }}
      >
        <input
          type="text"
          ref={inputElement}
          className={inputClass}
          value={searchQuery}
          onChange={handleSearchInput}
          onKeyDown={handleSearchKeyDown}
        />
        <img
          id="btn"
          className={styles['btn-search']}
          src={visibleInput ? './media/close.png' : './media/search.png'}
          alt=""
          onClick={handleClick}
        />
      </form>
      {renderSearchResults()}
    </div>
  );

  return search;
};

export default Search;
