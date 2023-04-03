package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.RoomFacility;

public interface RoomFacilityRepository extends JpaRepository<RoomFacility, Long> {
}