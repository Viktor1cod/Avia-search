import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { setSort, resetVisible } from "../app/appSlice";
import type { SortType } from "../types/ticket";

export default function SortTabs() {
  const dispatch = useDispatch<AppDispatch>();
  const sort = useSelector((s: RootState) => s.app.sort);

  const onSet = (v: SortType) => {
    dispatch(setSort(v));
    dispatch(resetVisible());
  };

  return (
    <div className="tabs">
      <button
        className={`tab ${sort === "cheap" ? "active" : ""}`}
        onClick={() => onSet("cheap")}
      >
        Самый дешевый
      </button>

      <button
        className={`tab ${sort === "fast" ? "active" : ""}`}
        onClick={() => onSet("fast")}
      >
        Самый быстрый
      </button>

      <button
        className={`tab ${sort === "optimal" ? "active" : ""}`}
        onClick={() => onSet("optimal")}
      >
        Самый оптимальный
      </button>
    </div>
  );
}