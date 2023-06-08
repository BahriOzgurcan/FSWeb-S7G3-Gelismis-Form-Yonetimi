import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import YeniKullaniciKarti from './pages/Form';
import { Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap';


function App() {
  const [kullaniciListesi, setKullaniciListesi] = useState([]);

  const kullaniciEkle = (yeniKullaniciKarti) => {
  
    // setKullaniciListesi([...kullaniciListesi, yeniKullaniciKarti]);
    axios
    .post("https://reqres.in/api/users", yeniKullaniciKarti)
    .then((res) => {
      setKullaniciListesi([...kullaniciListesi, res.data])
      
    })
  }

  return (
    <div className="App">
      <h1 style={{"backgroundColor":"green", "margin":"5px auto", "width":"250px"}}>Uye Ekle</h1>
        <YeniKullaniciKarti kullaniciEkle={kullaniciEkle} />
      <div >
        <h1 style={{"backgroundColor":"yellow", "margin":"5px auto", "width":"250px"}}>Uye Listesi</h1>
        {kullaniciListesi.map((uye, i) => {
          return (
            <div key={i} style={{"backgroundColor":"gray", "margin":"5px"}}>
            
            <Card
            style={{
              width: '18rem',
              margin: 'auto'
            }}
            data-cy="uye-karti"
            >
            <CardHeader>
            Isim: {uye.isim}
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem>
                E-mail: {uye.email}
              </ListGroupItem>
              <ListGroupItem>
              Sifre: {uye.password}
              </ListGroupItem>
              <ListGroupItem>
              Kayit Tipi: {uye.kayit_tipi}
              </ListGroupItem>
            </ListGroup>
          </Card>
            </div>
          )
        })
        }
      </div>
    </div>
  );
}

export default App;
