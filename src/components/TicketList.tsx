import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import TicketCard from "./TicketCard";

export default function TicketList() {
  const tickets = useSelector((s: RootState) => s.app.tickets);
  const visible = useSelector((s: RootState) => s.app.visible);
  const sort = useSelector((s: RootState) => s.app.sort);
  const stops = useSelector((s: RootState) => s.app.stops);

  let list = [...tickets];

  // фильтр по пересадкам
  if (stops.length > 0) {
    list = list.filter((t) => stops.includes(t.segments[0]?.stops.length ?? 0));
  }

  // сортировка
  if (sort === "cheap") {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === "fast") {
    list.sort((a, b) => (a.segments[0]?.duration ?? 0) - (b.segments[0]?.duration ?? 0));
  } else if (sort === "optimal") {
    list.sort((a, b) => {
      const scoreA = a.price + (a.segments[0]?.duration ?? 0) * 5;
      const scoreB = b.price + (b.segments[0]?.duration ?? 0) * 5;
      return scoreA - scoreB;
    });
  }

  const visibleList = list.slice(0, visible);

  if (visibleList.length === 0) {
    return <div className="hint">Ничего не найдено</div>;
  }

  return (
    <div className="list">
      {visibleList.map((t) => (
        <TicketCard key={t.id} ticket={t} />
      ))}
    </div>
  );
}