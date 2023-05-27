package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.Course;
import pl.dmcs.Sale.models.FacilityAvailable;
import pl.dmcs.Sale.models.Room;
import pl.dmcs.Sale.models.RoomFacility;

public interface RoomFacilityRepository extends JpaRepository<RoomFacility, Long> {
    boolean existsByRoomAndFacilityAvailable(Room room, FacilityAvailable facilityAvailable);
}