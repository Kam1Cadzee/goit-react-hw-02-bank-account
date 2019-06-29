import React from 'react';
import PropTypes from 'prop-types';
import types from '../transactionTypes';
import styled from 'styled-components';

const Button = styled.button`
  color: #fff;
  background-color: #3884fe;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: rgba(56, 132, 254, 0.69);
  }
`;
const Input = styled.input`
  border: none;
  padding: 5px;
  border-radius: 3px;
  color: #888;
  font-size: 18px;
`;
const Wrraper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #062b55;
  > ${Button} {
    margin-left: 10px;
  }
`;
class Controls extends React.PureComponent {
  state = { value: 0 };

  handleChange = e => this.setState({ value: +e.target.value });

  handleClick = ({ target }) => {
    const { onClickDeposit, onClickWithdraw } = this.props;
    const { name } = target;
    const { value } = this.state;
    if (name === 'deposit') onClickDeposit(value);
    else if (name === 'withdraw') onClickWithdraw(value);
    this.setState({ value: 0 });
  };

  render() {
    const { value } = this.state;
    return (
      <Wrraper>
        <Input type="number" value={value} onChange={this.handleChange} />
        <Button name="deposit" type="button" onClick={this.handleClick}>
          {types.DEPOSIT}
        </Button>
        <Button name="withdraw" type="button" onClick={this.handleClick}>
          {types.WITHDRAW}
        </Button>
      </Wrraper>
    );
  }
}

Controls.propTypes = {
  onClickDeposit: PropTypes.func.isRequired,
  onClickWithdraw: PropTypes.func.isRequired,
};

export default Controls;
