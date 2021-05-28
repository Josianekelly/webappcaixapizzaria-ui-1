import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className="box text-center">
        <br />
        <h2>Seja bem vindo!</h2>
        <br />
        <h3>Esse aplicativo controla abertura de caixa, os lançamentos do caixa e seu fechamento!</h3>
        <hr />
      </div>
    );
  }
}
