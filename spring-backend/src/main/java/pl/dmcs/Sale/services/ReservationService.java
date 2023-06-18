package pl.dmcs.Sale.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.Sale.models.Reservation;
import pl.dmcs.Sale.repositories.ReservationRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;

    public void insertNewReservation(Reservation reservation) {
        reservationRepository.save(reservation);
    }

    public void deleteAll() {
        reservationRepository.deleteAll();
    }

    public List<Reservation> findByClassScheduleId(Long classScheduleId) {
        return reservationRepository.findByClassScheduleId(classScheduleId);
    }

    public List<Reservation> getAllAcceptedReservations() {
        return reservationRepository.findByStatus(1L);
    }

    public List<Reservation> getAllAcceptedReservationsByRoomName(String roomName) {
        return reservationRepository.findByStatusAndClassScheduleRoomName(1L, roomName); // 0 - niezaakceptowana, 1 - zaakceptowana, 2 - odrzucona
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation updateReservation(Long id, Reservation reservation) {
        Reservation existingReservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find reservation with ID: " + id));

        existingReservation.setStatus(reservation.getStatus());
        return reservationRepository.save(existingReservation);
    }

    public void deleteReservationById(Long id) {
        reservationRepository.deleteById(id);
    }

    public List<Reservation> getAllAcceptedReservationsByDeanGroupName(String deanGroupName) {
        return reservationRepository.findByStatusAndClassScheduleDeanGroupName(1L, deanGroupName); // 0 - niezaakceptowana, 1 - zaakceptowana, 2 - odrzucona
    }
}
