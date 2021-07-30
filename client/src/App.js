import React, { Component } from 'react'
import axios from 'axios';
import { saveAs } from "file-saver";

import './App.css';

class App extends Component {
  state = {
    name: ' ',
    receiptId: 0,
    price1: 0,
    price2: 0,
  }

  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  createAndDonwload = () => {
    axios.post('/create-pdf',  this.state)
      .then(() => axios.get('/fetch-pdf'), { responseType: 'blob' })
      .then((response) => {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Name" name="name" onChange={this.handleChange}></input>
        <input type="text" placeholder="receip ID" name="receiptId" onChange={this.handleChange}></input>
        <input type="text" placeholder="price1" name="price1" onChange={this.handleChange}></input>
        <input type="text" placeholder="price2" name="price2" onChange={this.handleChange}></input>
        <button onClick={this.createAndDonwload} >Donwload</button>
      </div>
    );
  }
}

export default App;
