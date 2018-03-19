import React, { Component } from 'react';
import { toast } from 'react-toastify';

import './App.css';
import logo from './logo-mini.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 2000
    };

    this.publicKey = 'FLWPUBK-df56d479b9bcdaec781b5585094dff13-X';

    this.handlePay = this.handlePay.bind(this)
    this.handleAmountInput = this.handleAmountInput.bind(this)
  }

  handlePay() {
    window.getpaidSetup({
      amount: this.state.amount,
      txref: 'rave-checkout-1508751596',
      PBFPubKey: this.publicKey,
      custom_title: 'React Pay',
      payment_method: 'both',
      customer_email: 'john@example.com',
      customer_phone: '08033445566',
      onclose: function() {},
      callback: function(d) {
        // var flw_ref = d.tx.flwRef;
        if (d.tx.chargeResponseCode === '00' || d.tx.chargeResponseCode === '0') {
          toast.success("Wow! That was fast and easy!");
        } else {
          toast.error("Ouch! Please try again!");
        }
        console.log(d);
      }
    });
  }

  handleAmountInput(e) {
    this.setState({amount: e.target.value});
  }

  render() {
    return (
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <div className="header">
              <img src={logo} alt="" />
              <span>by flutterwave</span>
            </div>
            <h1 className="title">
              The easiest way to accept payments globally.
            </h1>
            <h2 className="subtitle">Click the button below to pay.</h2>
            <input
              type="number"
              className="amount"
              placeholder="Enter Amount"
              onChange={this.handleAmountInput}
            />
            <button className="button is-primary is-large" onClick={this.handlePay}>Pay</button>
            <a className="button is-outlined is-large">Read React Guide</a>
            <p className="test-cards">Use any of the cards <a target="_blank" href="https://flutterwavedevelopers.readme.io/v2.0/docs/test-cards">here</a> to test</p>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
