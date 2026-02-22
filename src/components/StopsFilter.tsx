import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { toggleStop, resetVisible } from "../app/appSlice";

export default function StopsFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const stops = useSelector((s: RootState) => s.app.stops);

  const onToggle = (n: number) => {
    dispatch(toggleStop(n));
    dispatch(resetVisible());
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <b>Количество пересадок:</b>
      <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
        {[0, 1, 2, 3].map((n) => (
          <label key={n} style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={stops.includes(n)}
              onChange={() => onToggle(n)}
            />
            <span>{n === 0 ? "Без пересадок" : `${n}`}</span>
          </label>
        ))}
      </div>
    </div>
  );
}