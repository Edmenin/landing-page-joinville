import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const postosData: Array<{
  id: number;
  nome: string;
  endereco: string;
  coordenadas: [number, number];
}> = [
  {
    id: 1,
    nome: "Posto Mime - Beira Rio",
    endereco: "Avenida Beira Rio, 2635, Joinville – SC",
    coordenadas: [-26.3041, -48.8456]
  },
  {
    id: 2,
    nome: "Posto Mime - Terminal Norte",
    endereco: "Rua Dona Francisca, 3125, Joinville - SC",
    coordenadas: [-26.3041, -48.8456]
  },
  {
    id: 3,
    nome: "Posto Mime Araquari Norte",
    endereco: "Rodovia BR-101, Km 56, Norte, Araquari - SC",
    coordenadas: [-26.3700, -48.7200]
  },
  {
    id: 4,
    nome: "Posto Mime Matriz",
    endereco: "Rua Walter Marquardt, 467, Vila Nova, Jaraguá do Sul – SC",
    coordenadas: [-26.4850, -49.0770]
  },
  {
    id: 5,
    nome: "Posto Mime Guaramirim",
    endereco: "BR-280, 12726, Guaramirim – SC",
    coordenadas: [-26.4700, -49.0000]
  },
  {
    id: 6,
    nome: "Posto Mime - Santa Catarina",
    endereco: "Rua Santa Catarina, 1300, Joinville – SC",
    coordenadas: [-26.3041, -48.8456]
  },
  {
    id: 7,
    nome: "Posto Mime - Monttreal",
    endereco: "Rua Ottokar Doerffel, 662, Joinville – SC",
    coordenadas: [-26.3041, -48.8456]
  },
  {
    id: 8,
    nome: "Posto Mime WEG II",
    endereco: "Rua Bernardo Dornbusch, 2400, Jaraguá do Sul – SC",
    coordenadas: [-26.4850, -49.0770]
  },
  {
    id: 9,
    nome: "Posto Mime Chico de Paulo",
    endereco: "Rua Joaquim Francisco de Paula, 360, Jaraguá do Sul - SC",
    coordenadas: [-26.4850, -49.0770]
  },
  {
    id: 10,
    nome: "Posto Mime - Ottokar",
    endereco: "Rua Ottokar Doerffel, 383, Joinville – SC",
    coordenadas: [-26.3041, -48.8456]
  },
  {
    id: 11,
    nome: "Posto Mime Figueira",
    endereco: "Rua José Theodoro Ribeiro, 1560, Jaraguá do Sul – SC",
    coordenadas: [-26.4850, -49.0770]
  },
  {
    id: 12,
    nome: "Posto Shell Mime",
    endereco: "SC-416, 99, Garuva – SC",
    coordenadas: [-26.0300, -48.8500]
  },
  {
    id: 13,
    nome: "Posto Mime Serra Norte",
    endereco: "Rodovia Dep. Genésio Tureck, 1125, Mafra – SC",
    coordenadas: [-26.1100, -49.8100]
  },
  {
    id: 14,
    nome: "Posto Mime Araquari Sul",
    endereco: "BR-101, KM 56, Araquari – SC",
    coordenadas: [-26.3700, -48.7200]
  },
  {
    id: 15,
    nome: "Posto Mime - Bucarein",
    endereco: "Av. Cel. Procópio Gomes, 1127, Joinville – SC",
    coordenadas: [-26.3041, -48.8456]
  },
  {
    id: 16,
    nome: "Postos Mime Navegantes",
    endereco: "BR-470, Navegantes – SC",
    coordenadas: [-26.9000, -48.6500]
  },
  {
    id: 17,
    nome: "Posto Mime Schroeder",
    endereco: "R. Mal. Castelo Branco, 3490, Schroeder – SC",
    coordenadas: [-26.4100, -49.0700]
  },
  {
    id: 18,
    nome: "Posto Mime Expocentro",
    endereco: "Av. Hermógenes Assis Feijó, 2100, Florianópolis – SC",
    coordenadas: [-27.5969, -48.5495]
  },
  {
    id: 19,
    nome: "Posto Mime Rita Maria",
    endereco: "Av. Paulo Fontes, 1136, Florianópolis – SC",
    coordenadas: [-27.5969, -48.5495]
  },
  {
    id: 20,
    nome: "Posto Mime Garcia",
    endereco: "R. Amazonas, 920, Blumenau – SC",
    coordenadas: [-26.9189, -49.0661]
  },
  {
    id: 21,
    nome: "Posto Mime Badenfürt",
    endereco: "Rodovia BR-470, Km 8, Blumenau – SC",
    coordenadas: [-26.9189, -49.0661]
  },
  {
    id: 22,
    nome: "Posto Mime Gaspar",
    endereco: "R. Hercílio Fides Zimmermann, 1495, Gaspar – SC",
    coordenadas: [-26.9300, -48.9600]
  },
  {
    id: 23,
    nome: "Posto Mime Barra",
    endereco: "R. Feliciano Bortolini, 1305, Jaraguá do Sul – SC",
    coordenadas: [-26.4850, -49.0770]
  },
  {
    id: 24,
    nome: "Posto Mime Apiúna",
    endereco: "R. Quintino Bocaiúva, 353, Apiúna - SC",
    coordenadas: [-27.1000, -49.5700]
  },
  {
    id: 25,
    nome: "Posto Mime Praia Norte",
    endereco: "SC-401, 14298 - Vargem Pequena, Florianópolis - SC",
    coordenadas: [-27.5969, -48.5495]
  },
  {
    id: 26,
    nome: "Posto Mime Antônio Heil",
    endereco: "Rod. Antônio Heil, 655 - Itaipava, Itajaí - SC",
    coordenadas: [-26.9000, -48.6500]
  },
  {
    id: 27,
    nome: "Posto Mime - Anita",
    endereco: "R. Anita Garibaldi, 1099, Joinville - SC",
    coordenadas: [-26.3041, -48.8456]
  },
  {
    id: 28,
    nome: "Posto Mime Via Porto",
    endereco: "BR-470, 5555 - Volta Grande, Navegantes - SC",
    coordenadas: [-26.9000, -48.6500]
  },
  {
    id: 29,
    nome: "Posto Mime Cristo Luz",
    endereco: "R. Israel, 317 - Nações, Balneário Camboriú - SC",
    coordenadas: [-26.9900, -48.6300]
  },
  {
    id: 30,
    nome: "Postos Mime Porto Belo",
    endereco: "Av. Gov. Celso Ramos, 1499, Porto Belo - SC",
    coordenadas: [-27.1500, -48.5500]
  },
  {
    id: 31,
    nome: "Posto Mime Eco Sul",
    endereco: "Sentido Sul - BR-101, km 208 - Picadas do Sul, São José - SC",
    coordenadas: [-27.5969, -48.5495]
  },
  {
    id: 32,
    nome: "Posto Mime São Francisco",
    endereco: "R. Barão do Rio Branco, 731 - Centro, São Francisco do Sul - SC",
    coordenadas: [-26.2400, -48.6400]
  },
  {
    id: 33,
    nome: "Posto Mime Rio Tavares",
    endereco: "Rod. Francisco Magno Vieira, 865 - Rio Tavares, Florianópolis - SC",
    coordenadas: [-27.5969, -48.5495]
  },
  {
    id: 34,
    nome: "Posto Mime 1500",
    endereco: "4ª Av., 700 - Centro, Balneário Camboriú - SC",
    coordenadas: [-26.9900, -48.6300]
  },
  {
    id: 35,
    nome: "Posto Mime São Bento",
    endereco: "Av. Argolo, 282 - Centro, São Bento do Sul - SC",
    coordenadas: [-26.2500, -49.3800]
  },
  {
    id: 36,
    nome: "Posto Mime Pomerode",
    endereco: "R. XV de Novembro, 2004 - Centro, Pomerode - SC",
    coordenadas: [-26.7400, -49.1800]
  },
  {
    id: 37,
    nome: "Posto Mime Parada Itajaí",
    endereco: "BR-101, KM 121 - 8925 - Cidade Nova, Itajaí - SC",
    coordenadas: [-26.9000, -48.6500]
  },
  {
    id: 38,
    nome: "Posto Mime Indaial",
    endereco: "BR-470, 1755 - Encano do Norte, Indaial - SC",
    coordenadas: [-26.9000, -49.2300]
  },
  {
    id: 39,
    nome: "Posto Mime Rex",
    endereco: "Av. Luiz de Camões, 1320 - Conta Dinheiro, Lages - SC",
    coordenadas: [-27.8100, -50.3200]
  },
  {
    id: 40,
    nome: "Posto Mime Willrich",
    endereco: "Av. Lauro Muller, 149, São Bento do Sul - SC",
    coordenadas: [-26.2500, -49.3800]
  },
  {
    id: 41,
    nome: "Posto Mime Continente",
    endereco: "R. Camilo Veríssimo da Silva, 415 - Roçado, São José - SC",
    coordenadas: [-27.5969, -48.5495]
  },
  {
    id: 42,
    nome: "Posto Mime Choco Leite",
    endereco: "R. Gustavo Gumz, 477 - Rio Cerro II, Jaraguá do Sul - SC",
    coordenadas: [-26.4850, -49.0770]
  },
  {
    id: 43,
    nome: "Posto Mime Martin Luther",
    endereco: "Av. Martin Luther, 1112 - Victor Konder, Blumenau - SC",
    coordenadas: [-26.9189, -49.0661]
  },
  {
    id: 44,
    nome: "Posto Mime Hass",
    endereco: "R. São Paulo, 121 - Victor Konder, Blumenau - SC",
    coordenadas: [-26.9189, -49.0661]
  },
  {
    id: 45,
    nome: "Posto Mime Eco Norte",
    endereco: "Sentido Norte - BR-101, km 208 - Sala 1 - São Luiz, São José - SC",
    coordenadas: [-27.5969, -48.5495]
  },
  {
    id: 46,
    nome: "Posto Mime Encontro",
    endereco: "BR-470, km 141, 6867, Apiúna - SC",
    coordenadas: [-27.1000, -49.5700]
  },
  {
    id: 47,
    nome: "Posto Mime Rua XV",
    endereco: "R. XV de Novembro, 1234, Blumenau - SC",
    coordenadas: [-26.9189, -49.0661]
  },
  {
    id: 48,
    nome: "Posto Mime Ituporanga",
    endereco: "R. Pres. Nereu, 993 - Centro, Ituporanga - SC",
    coordenadas: [-27.4200, -49.6000]
  }
];

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map: React.FC = () => {
  const [selectedPosto, setSelectedPosto] = useState<number>(1);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-26.3041, -48.8456]);

  const handlePostoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const postoId = parseInt(event.target.value);
    setSelectedPosto(postoId);
    
    const posto = postosData.find(p => p.id === postoId);
    if (posto) {
      setMapCenter(posto.coordenadas);
    }
  };

  return (
    <div className="map-section">
      <div className="map-controls">
        <label htmlFor="posto-select">Selecione um Posto:</label>
        <select
          id="posto-select"
          value={selectedPosto}
          onChange={handlePostoChange}
          className="posto-selector"
        >
          {postosData.map((posto) => (
            <option key={posto.id} value={posto.id}>
              {posto.nome}
            </option>
          ))}
        </select>
      </div>
      
      <div className="map-container">
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: '500px', width: '100%' }}
          key={`${mapCenter[0]}-${mapCenter[1]}`}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {postosData.map((posto) => (
            <Marker
              key={posto.id}
              position={posto.coordenadas}
              icon={new L.Icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                shadowSize: [41, 41]
              })}
            >
              <Popup>
                <div className="popup-content">
                  <h3>{posto.nome}</h3>
                  <p><strong>Endereço:</strong> {posto.endereco}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
