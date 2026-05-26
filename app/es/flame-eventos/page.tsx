import type { Metadata } from "next";
import EventsTemplate from "@/components/templates/EventsTemplate";

export const metadata: Metadata = {
  title: "Eventos y Webinars · Flame Analytics",
  description: "Flame Talks, webinars técnicos y presencia en grandes ferias del retail. Calendario completo y sesiones grabadas.",
};

export default function FlameEventosDraft() {
  return <EventsTemplate enHref="/en/flame-events/" />;
}
