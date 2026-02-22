import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { loadMore } from "../app/appSlice";

export default function LoadMoreButton() {
  const dispatch = useDispatch<AppDispatch>();
  const visible = useSelector((s: RootState) => s.app.visible);
  const tickets = useSelector((s: RootState) => s.app.tickets);

  if (tickets.length <= visible) return null;

  return (
    <button className="loadMore" onClick={() => dispatch(loadMore())}>
      Загрузить еще билеты
    </button>
  );
}