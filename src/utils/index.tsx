import L from "leaflet";

export const icon = new L.Icon({
  iconUrl: "./marker.png",
  iconSize: new L.Point(25, 31),
  iconAnchor: [13, 17],
});

export const toCelsius = (n: number | undefined, fix?: number ) =>
  n ? (Math.abs(n) - 273.15).toFixed(fix || 2) : 0;

export const capitalizeFirst = (str: string) => {
  const firstLetter = str.slice(0, 1).toUpperCase();
  const rest = str.slice(1);

  return `${firstLetter}${rest}`;
};