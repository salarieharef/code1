"use client";
import { memo, useEffect } from "react";

// Component imports
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

let DefaultIcon = L.icon({
  iconUrl: "/static/icons/marker.svg",
  shadowUrl: "/static/images/leaflet/marker-shadow.png",
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapEvents = ({ positionChange, boundsChange, position, zoom }: any) => {
  const mapEvents = useMapEvents({
    moveend(e) {
      if (boundsChange) {
        boundsChange({
          top_right_lat: e.target.getBounds()?._northEast?.lat,
          top_right_lon: e.target.getBounds()?._northEast?.lng,
          bottom_left_lat: e.target.getBounds()?._southWest?.lat,
          bottom_left_lon: e.target.getBounds()?._southWest?.lng,
        });
      }
    },
    load(e) {
      mapEvents.locate();
    },
    locationfound(e: any) {
      if (positionChange) {
        positionChange(e.latlng);
      }
      mapEvents.flyTo(e.latlng, mapEvents.getZoom());
    },
  });

  const map = useMap();
  useEffect(() => {
    if (boundsChange) {
      boundsChange({
        top_right_lat: map.getBounds()?.getNorthEast()?.lat,
        top_right_lon: map.getBounds()?.getNorthEast()?.lng,
        bottom_left_lat: map.getBounds()?.getSouthWest()?.lat,
        bottom_left_lon: map.getBounds()?.getSouthWest()?.lng,
      });
    }
  }, [boundsChange]);

  useEffect(() => {
    if (position) {
      map.panTo({ lat: position[0], lng: position[1] });
    }
  }, [position]);

  useEffect(() => {
    if (zoom) {
      map.setZoom(zoom);
    }
  }, [zoom]);

  return <></>;
};

const Map = memo(
  ({
    data,
    onMarkerClick,
    positionChange,
    position,
    boundsChange,
    zoom,
    zoomChange,
  }: any) => {
    return (
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />

        <MapEvents
          positionChange={positionChange}
          boundsChange={boundsChange}
          position={position}
          zoom={zoom}
        />

        {data?.map((item: any, key: number) => (
          <>
            {item?.lat && item?.lon ? (
              <Marker
                position={[item?.lat, item?.lon]}
                eventHandlers={{
                  mouseover: (e) => {
                    e.target.openPopup();
                  },
                  mouseout: (e) => {
                    e.target.closePopup();
                  },
                  click: (e) => {
                    if (positionChange) {
                      positionChange([item?.lat, item?.lon]);
                      zoomChange(16);
                    }
                    onMarkerClick(item?.id);
                  },
                }}
              >
                <Popup>
                  <div className='flex w-full items-center justify-center font-sans'>
                    <span className='text-center'>{item?.name}</span>
                  </div>
                </Popup>
              </Marker>
            ) : null}
          </>
        ))}
      </MapContainer>
    );
  }
);

Map.displayName = "Map";

export default Map;
