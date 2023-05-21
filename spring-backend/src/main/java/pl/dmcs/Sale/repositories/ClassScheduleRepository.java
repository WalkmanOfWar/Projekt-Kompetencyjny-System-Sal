package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.dmcs.Sale.models.ClassSchedule;
import pl.dmcs.Sale.models.Reservation;
import pl.dmcs.Sale.models.Room;

import java.util.List;

public interface ClassScheduleRepository extends JpaRepository<ClassSchedule, Long> {
//    @Query("SELECT cs from ClassSchedule cs JOIN Room r WHERE r.name = :roomName")
    List<ClassSchedule> findByRoomName(String roomName);
}