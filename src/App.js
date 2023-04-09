import logo from './logo.svg';
import './App.css';
import QRCode from 'qrcode.react';
import { useState, useEffect } from 'react';

function App() {
  let eventSource = undefined;

  useEffect(() => {
    eventSource = registerSSE("https://tdshop.herokuapp.com/api/v1/order/register-client");
    return () => {
      eventSource.close();
      console.log("event closed")
    }

  }, [])
  

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <div>
          <QRCode
            id='qrcode'
            value='momo://app?action=payWithApp&isScanQR=true&serviceType=qr&sid=TU9NT3xhYmQzODk5Ni1hMTQ0LTRiYTEtYTI3MS00Mjc5YTg2NTZhYTQ&v=2.3'
            size={290}
            level={'H'}
            includeMargin={true}
          />
        </div>
      </header>
    </div>
  );
}

function registerSSE(url) {
  const source = new EventSource(url);
  source.addEventListener('payment_result', event => {
      handlePaymentResultEvent(JSON.parse(event.data));
  })
  source.onopen = event => console.log("Connection opened");
  source.onerror = event => console.error("Connection error");
  return source;
}

function handlePaymentResultEvent(data) {
  console.log(data);
}

export default App;
