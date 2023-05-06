package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.dmcs.Sale.models.Room;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
}