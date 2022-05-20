import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

//Props otettu vastaan suoraan
const Laskuri = () => {

//Komponentin tilan ja sitä muuttavan metodin määritys
const [luku, setLuku] = useState(0)

  return (
    <>
        <h3>{luku}</h3>

        <button onClick={() => setLuku(luku + 1)}>+</button>

        <button onClick={() => setLuku(luku - 1)}>-</button>

        <button onClick={() => setLuku(0)}>Reset</button>
    </>
  );
}

export default Laskuri;
