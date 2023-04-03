package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}