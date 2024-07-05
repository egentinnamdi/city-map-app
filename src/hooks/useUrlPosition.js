import { useSearchParams } from "react-router-dom";
export function useUrlPosition() {
  const [searchPosition] = useSearchParams();
  const lat = searchPosition.get("lat");
  const lng = searchPosition.get("lng");
  return [lat, lng];
}
