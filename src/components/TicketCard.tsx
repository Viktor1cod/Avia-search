import type { Ticket } from "../types/ticket";

function fmtPrice(p: number) {
  return new Intl.NumberFormat("ru-RU").format(p) + " ₽";
}

function fmtDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h} ч ${m} мин`;
}

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  const seg = ticket.segments[0];
  const route = seg ? `${seg.origin} - ${seg.destination}` : "—";
  const duration = seg?.duration ?? 0;
  const stopsCount = seg?.stops.length ?? 0;

  return (
    <article className="card">
      <div className="cardTop">
        <div className="price">{fmtPrice(ticket.price)}</div>
        <div className="carrier">{ticket.carrier}</div>
      </div>

      <div className="cardGrid">
        <div>
          <div className="metaLabel">{route}</div>
          <div className="metaValue">12:00 - 16:30</div>
        </div>

        <div>
          <div className="metaLabel">В пути</div>
          <div className="metaValue">{fmtDuration(duration)}</div>
        </div>

        <div>
          <div className="metaLabel">Пересадки</div>
          <div className="metaValue">
            {stopsCount === 0 ? "Без пересадок" : `${stopsCount} пересадка(и)`}
          </div>
        </div>
      </div>
    </article>
  );
}