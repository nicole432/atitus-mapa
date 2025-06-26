import { useEffect, useContext, useState } from "react";
import { Navbar } from "../components";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { getPoints, postPoint } from '../services/mapService';
import { InfoWindow } from "@react-google-maps/api";
import { useAuth } from "../contexts/AuthContext";
import Modal from "../components/Modal";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export const Map = () => {
  const { token } = useAuth();
  const [markers, setMarkers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newMarkerPos, setNewMarkerPos] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Substitua pela sua chave da API do Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        // se não obter a localização do usuário, Passo Fundo é a localização padrão
        setUserLocation({ lat: -28.2576, lng: -52.4091 });
      }
    );
  }, []);
  useEffect(() => {
    async function fetchMarkers() {
      try {
        const data = await getPoints(token);
        console.log(data)

        setMarkers(data.map(point => ({
          id: point.id,
          position: {  lat: Number(point.latitude), lng: Number(point.longitude)},
          name: point.name,
          description: point.description
        })));
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMarkers();
  }, [token]);

  // Função para adicionar ponto ao clicar no mapa
  const handleMapClick = (event) => {
    setNewMarkerPos({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setModalOpen(true);
  };

  // ao salvar no modal, salva o ponto
  const handleSavePoint = async ({ name, description }) => {
    const newPoint = {
      latitude: Number(newMarkerPos.lat),
      longitude: Number(newMarkerPos.lng),
      name: name,
      description: description,
    };
    try {
      console.log("Enviando para API:", newPoint);
      const savedPoint = await postPoint(token, newPoint);

      const savedMarker = {
        id: savedPoint.id,
        position: {
          lat: savedPoint.latitude,
          lng: savedPoint.longitude,
        },
        name: savedPoint.name,
        description: savedPoint.description,
      };
      setMarkers((prev) => [...prev, savedMarker]);
      setModalOpen(false);
      setNewMarkerPos(null);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ width: "100%", height: "100%" }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation}
            zoom={12}
            onClick={handleMapClick}
          >
            {markers.map(marker => (
              <Marker
                key={marker.id}
                position={marker.position}
                title={marker.name}
                onClick={() => setSelectedMarker(marker)}
              />
            ))}
            {selectedMarker && (
              <InfoWindow
                position={selectedMarker.position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  <strong>Nome do estabelecimento:</strong>
                  <p>{selectedMarker.name}</p>
                  <strong>Seu comentário:</strong>
                  <p>{selectedMarker.description}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <div>Carregando mapa...</div>
        )}
        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            handleSavePoint={handleSavePoint}
          />
        )}
      </div>
    </>
  );
};
