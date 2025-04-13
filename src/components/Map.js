'use client';
import { useEffect, useRef } from 'react';

export default function Map({ lat, lng }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!lat || !lng || !window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 15,
    });

    new window.google.maps.Marker({
      position: { lat, lng },
      map,
      title: 'You are here',
    });
  }, [lat, lng]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '300px', borderRadius: '12px', marginTop: '1rem' }}
    />
  );
}
