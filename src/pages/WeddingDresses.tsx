import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import styles from '../styles/WeddingDresses.module.css';

interface Shop {
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id: string;
  rating?: number;
}

const WeddingDresses = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY' // Replace with your API key
  });

  const searchNearbyShops = useCallback(async (location: { lat: number; lng: number }) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
        `location=${location.lat},${location.lng}&` +
        `radius=50000&` + // 50km radius
        `type=clothing_store&` +
        `keyword=wedding+dress+bridal&` +
        `key=YOUR_GOOGLE_MAPS_API_KEY` // Replace with your API key
      );

      const data = await response.json();
      if (data.status === 'OK') {
        setShops(data.results);
      } else {
        setError('Nije moguće pronaći salone u vašoj blizini.');
      }
    } catch (err) {
      setError('Došlo je do greške prilikom pretrage salona.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          searchNearbyShops(location);
        },
        () => {
          setError('Nije moguće pristupiti vašoj lokaciji. Molimo dozvolite pristup lokaciji.');
          setIsLoading(false);
        }
      );
    } else {
      setError('Vaš pretraživač ne podržava geolokaciju.');
      setIsLoading(false);
    }
  }, [searchNearbyShops]);

  const mapContainerStyle = {
    width: '100%',
    height: '600px'
  };

  const center = userLocation || { lat: 44.787197, lng: 20.457273 }; // Default to Belgrade

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Saloni venčanica u vašoj blizini</h1>
      
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {isLoading ? (
        <div className={styles.loading}>
          <span className={styles.loadingIcon}>⏳</span>
          Učitavanje salona...
        </div>
      ) : (
        <>
          <div className={styles.mapContainer}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={11}
              >
                {/* User location marker */}
                {userLocation && (
                  <Marker
                    position={userLocation}
                    icon={{
                      url: '🏠',
                      scaledSize: new window.google.maps.Size(30, 30)
                    }}
                  />
                )}

                {/* Shop markers */}
                {shops.map((shop) => (
                  <Marker
                    key={shop.place_id}
                    position={shop.geometry.location}
                    onClick={() => setSelectedShop(shop)}
                    icon={{
                      url: '👗',
                      scaledSize: new window.google.maps.Size(30, 30)
                    }}
                  />
                ))}

                {/* Info window for selected shop */}
                {selectedShop && (
                  <InfoWindow
                    position={selectedShop.geometry.location}
                    onCloseClick={() => setSelectedShop(null)}
                  >
                    <div className={styles.infoWindow}>
                      <h3>{selectedShop.name}</h3>
                      <p>{selectedShop.vicinity}</p>
                      {selectedShop.rating && (
                        <p>Ocena: {selectedShop.rating} ⭐</p>
                      )}
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            ) : (
              <div className={styles.loading}>Učitavanje mape...</div>
            )}
          </div>

          <div className={styles.shopList}>
            <h2>Pronađeni saloni</h2>
            {shops.length === 0 ? (
              <p>Nema pronađenih salona u krugu od 50km.</p>
            ) : (
              <div className={styles.shopGrid}>
                {shops.map((shop) => (
                  <div
                    key={shop.place_id}
                    className={styles.shopCard}
                    onClick={() => {
                      setSelectedShop(shop);
                      // Center map on selected shop
                      if (map) {
                        map.panTo(shop.geometry.location);
                        map.setZoom(14);
                      }
                    }}
                  >
                    <h3>{shop.name}</h3>
                    <p>{shop.vicinity}</p>
                    {shop.rating && (
                      <div className={styles.rating}>
                        {shop.rating} ⭐
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WeddingDresses; 