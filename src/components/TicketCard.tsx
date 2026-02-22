import type { Ticket } from "../types/ticket";

function fmtPrice(p: number) {
  return new Intl.NumberFormat("ru-RU").format(p) + " ₽";
}

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  const stopsCount = ticket.segments[0]?.stops.length ?? 0;
  const duration = ticket.segments[0]?.duration ?? 0;

  return (
    <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <b>{fmtPrice(ticket.price)}</b>
        <span>{ticket.carrier}</span>
      </div>

      <div style={{ marginTop: 6, fontSize: 14, opacity: 0.8 }}>
        В пути: {duration} мин • Пересадок: {stopsCount}
      </div>
    </div>
  );
}