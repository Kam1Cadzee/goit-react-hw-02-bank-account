import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, costs, income }) => {
  return (
    <div className={styles.balance}>
      <p>+ {costs}</p>
      <p>- {income}</p>
      <p>{balance}$</p>
    </div>
  );
};
Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  costs: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
};
export default Balance;
