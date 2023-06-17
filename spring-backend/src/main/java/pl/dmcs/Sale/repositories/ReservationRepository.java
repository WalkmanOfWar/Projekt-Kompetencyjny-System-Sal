package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.Course;
import pl.dmcs.Sale.models.Reservation;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByClassScheduleId(Long classScheduleId);
    List<Reservation> findByStatus(Long status);
    List<Reservation> findByStatusAndClassScheduleRoomName(Long status, String roomName);
}
