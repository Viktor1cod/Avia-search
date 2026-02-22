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
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <h1>Поиск авиабилетов</h1>

      <StopsFilter />
      <SortTabs />

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <TicketList />
      <LoadMoreButton />
    </div>
  );
}