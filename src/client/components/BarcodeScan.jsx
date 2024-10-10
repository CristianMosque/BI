import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';
import axios from 'axios';

function BarcodeScan() {
  const [scannedCode, setScannedCode] = useState('');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector('#scanner-container')
        },
        decoder: {
          readers: ["ean_reader", "ean_8_reader", "code_128_reader"]
        }
      },
      function(err) {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected(handleScan);

    return () => {
      Quagga.offDetected(handleScan);
      Quagga.stop();
    };
  }, []);

  const handleScan = (data) => {
    setScannedCode(data.codeResult.code);
    fetchProduct(data.codeResult.code);
  };

  const fetchProduct = async (code) => {
    try {
      const response = await axios.get(`/api/inventory/barcode/${code}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    }
  };

  const handleQuantityChange = async (change) => {
    if (product) {
      try {
        await axios.put(`/api/inventory/${product.id}`, {
          quantity: product.quantity + change
        });
        fetchProduct(scannedCode);
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };

  return (
    <div>
      <h2>Escaneo de Códigos de Barras</h2>
      <div id="scanner-container" style={{width: '100%', height: '300px'}}></div>
      {scannedCode && <p>Código escaneado: {scannedCode}</p>}
      {product && (
        <div>
          <h3>{product.name}</h3>
          <p>Precio: ${product.price}</p>
          <p>Cantidad en stock: {product.quantity}</p>
          <button onClick={() => handleQuantityChange(1)}>Añadir</button>
          <button onClick={() => handleQuantityChange(-1)}>Restar</button>
        </div>
      )}
    </div>
  );
}

export default BarcodeScan;