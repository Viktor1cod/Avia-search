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
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <button onClick={() => onSet("cheap")} style={{ fontWeight: sort === "cheap" ? 700 : 400 }}>
        Самый дешевый
      </button>
      <button onClick={() => onSet("fast")} style={{ fontWeight: sort === "fast" ? 700 : 400 }}>
        Самый быстрый
      </button>
    </div>
  );
}