import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchTickets } from "../app/appSlice";

import StopsFilter from "../components/StopsFilter";
import SortTabs from "../components/SortTabs";
import TicketList from "../components/TicketList";
import LoadMoreButton from "../components/LoadMoreButton";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((s: RootState) => s.app.loading);
  const error = useSelector((s: RootState) => s.app.error);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <div className="page">
      <div className="header">
        <div className="logo">✈️</div>
        <h1 className="title">Поиск авиабилетов</h1>
      </div>

      <div className="layout">
        <aside className="sidebar">
          <StopsFilter />

          {/* Заглушка "Компании" (как в макете).
              Если хочешь — потом добавим настоящий фильтр по компаниям */}
          <div className="panel">
            <div className="panelTitle">Компании</div>
            <div className="checkList">
              <label className="check">
                <input type="radio" name="c" defaultChecked />
                Победа
              </label>
              <label className="check">
                <input type="radio" name="c" />
                Red Wings
              </label>
              <label className="check">
                <input type="radio" name="c" />
                S7 Airlines
              </label>
            </div>
          </div>
        </aside>

        <main className="main">
          <SortTabs />

          {loading && <div className="hint">Загрузка...</div>}
          {error && <div className="error">{error}</div>}

          <TicketList />
          <LoadMoreButton />
        </main>
      </div>
    </div>
  );
}