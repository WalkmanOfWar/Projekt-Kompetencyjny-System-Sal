package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
}