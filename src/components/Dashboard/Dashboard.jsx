import React from 'react';
import shortid from 'shortid';
import styles from './Dashboard.module.css';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import Controls from './Controls/Controls';
import types from './transactionTypes';
import { withToastManager } from 'react-toast-notifications';
class Dashboard extends React.Component {
  state = { history: [], balance: 0 };

  componentDidMount() {
    const state = localStorage.getItem('bank');
    if (state) {
      this.setState(JSON.parse(state));
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    localStorage.setItem('bank', JSON.stringify(this.state));
  }

  createItemHistory = (amount, type) => ({
    id: shortid.generate(),
    type,
    amount,
    date: new Date().toLocaleString(),
  });

  getCostsOrIncome = type =>
    // eslint-disable-next-line react/destructuring-assignment
    this.state.history
      .filter(trans => trans.type === type)
      .reduce((acc, current) => acc + current.amount, 0);

  handelClickDeposit = value => {
    const { toastManager } = this.props;
    if (value === 0) {
      toastManager.add('Введите сумму для проведения операции!', {
        appearance: 'warning',
        autoDismiss: true,
      });
      return;
    }
    this.setState(state => {
      const balance = state.balance + value;
      return {
        balance,
        history: [
          ...state.history,
          this.createItemHistory(value, types.DEPOSIT),
        ],
      };
    });
  };

  handelClickWithdraw = value => {
    let { balance } = this.state;
    const { toastManager } = this.props;
    if (balance < value) {
      toastManager.add(
        'На счету недостаточно средств для проведения операции!',
        {
          appearance: 'error',
          autoDismiss: true,
        },
      );
      return;
    }
    if (value === 0) {
      toastManager.add('Введите сумму для проведения операции!', {
        appearance: 'warning',
        autoDismiss: true,
      });
      return;
    }
    this.setState(state => {
      balance = state.balance - value;
      return {
        balance,
        history: [
          ...state.history,
          this.createItemHistory(value, types.WITHDRAW),
        ],
      };
    });
  };

  render() {
    const { history, balance } = this.state;
    return (
      <div className={styles.dashboard}>
        <Controls
          onClickDeposit={this.handelClickDeposit}
          onClickWithdraw={this.handelClickWithdraw}
        />
        <Balance
          balance={balance}
          costs={this.getCostsOrIncome(types.DEPOSIT)}
          income={this.getCostsOrIncome(types.WITHDRAW)}
        />
        <TransactionHistory transactions={history} />
      </div>
    );
  }
}

export default withToastManager(Dashboard);
