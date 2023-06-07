import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import YeniKullaniciKarti from './pages/Form';
import { Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap';


function App() {
  const [kullaniciListesi, setKullaniciListesi] = useState([]);
  const [serverListesi, setServerListesi] = useState([]);

  const kullaniciEkle = (yeniKullaniciKarti) => {
  
    setKullaniciListesi([...kullaniciListesi, yeniKullaniciKarti]);
    axios
    .post("https://reqres.in/api/users", yeniKullaniciKarti)
    .then((res) => {
      console.log("Uye sisteme basari ile yuklendi.")
    })
  }
useEffect(()=>{
  axios
  .get("https://reqres.in/api/users")
  .then((res)=> {
    setServerListesi(res.data.data)
    console.log("gelen data", serverListesi)
  });
}, [kullaniciListesi])
  return (
    <div className="App">
        <YeniKullaniciKarti kullaniciEkle={kullaniciEkle} />
      <div >
        <> Lokal Uye Listesi</>
        {kullaniciListesi.map((uye, i) => {
          return (
            <div key={i} style={{"backgroundColor":"blue", "margin":"5px"}}>
            
            <Card
            style={{
              width: '18rem',
              margin: 'auto'
            }}
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
