// @flow strict
import React from 'react';
import styles from './Copyright.module.scss';
import moment from 'moment';

type Props = {
  copyright: string
};

const Copyright = ({ copyright }: Props) => (
  <div className={styles['copyright']}>
    {copyright} {moment(new Date()).format('YYYY')}
  </div>
);

export default Copyright;
