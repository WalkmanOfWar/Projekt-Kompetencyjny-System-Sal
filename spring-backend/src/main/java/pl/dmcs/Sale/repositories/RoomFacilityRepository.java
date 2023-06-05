package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.dmcs.Sale.models.Course;
import pl.dmcs.Sale.models.FacilityAvailable;
import pl.dmcs.Sale.models.Room;
import pl.dmcs.Sale.models.RoomFacility;

import java.util.List;

public interface RoomFacilityRepository extends JpaRepository<RoomFacility, Long> {
    boolean existsByRoomAndFacilityAvailable(Room room, FacilityAvailable facilityAvailable);

    List<RoomFacility> findByRoom(Room room);
    @Query("SELECT rf FROM RoomFacility rf WHERE rf.room IN :rooms")
    List<RoomFacility> findByRooms(@Param("rooms") List<Room> rooms);
    List<RoomFacility> findByRoomId(Long room_id);
}