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

    public List<Reservation> findByUserEmail(String email) {
        return reservationRepository.findByUserEmail(email);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
}
