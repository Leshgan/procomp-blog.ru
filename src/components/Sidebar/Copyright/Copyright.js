// @flow strict
import React from 'react';
import moment from 'moment';
import styles from './Copyright.module.scss';

type Props = {
  copyright: string
};

const Copyright = ({ copyright }: Props) => (
  <div className={styles['copyright']}>
    {copyright} {moment(new Date()).format('YYYY')}
  </div>
);

export default Copyright;
