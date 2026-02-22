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
    <div className="panel">
      <div className="panelTitle">Количество пересадок</div>

      <div className="checkList">
        {[0, 1, 2, 3].map((n) => (
          <label key={n} className="check">
            <input
              type="checkbox"
              checked={stops.includes(n)}
              onChange={() => onToggle(n)}
            />
            <span>
              {n === 0 ? "Без пересадок" : n === 1 ? "1 пересадка" : `${n} пересадки`}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}