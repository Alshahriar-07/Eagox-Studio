import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Service } from "@/data/services";

type ServiceCardProps = {
  service: Service;
};

/**
 * Service card per the documented card structure:
 * service → short description → starting price → suitable-for → CTA.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <GlassCard className="service-card">
      <div className="service-card-body">
        <p className="text-label">{service.suitableFor}</p>
        <h3 className="service-card-title">{service.shortTitle}</h3>
        <p className="service-card-desc text-secondary">{service.description}</p>
        <p className="service-card-price">
          <span className="service-card-price-label">Starting from</span>
          <span className="service-card-price-value">{service.startingPrice}</span>
        </p>
        <Link href="/services" className="service-card-link">
          Details <span aria-hidden="true">→</span>
        </Link>
      </div>
    </GlassCard>
  );
}
