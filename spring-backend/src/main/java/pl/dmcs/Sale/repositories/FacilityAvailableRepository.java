package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.FacilityAvailable;

public interface FacilityAvailableRepository extends JpaRepository<FacilityAvailable, Long> {
}