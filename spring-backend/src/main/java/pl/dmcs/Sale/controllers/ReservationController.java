package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.dmcs.Sale.models.Reservation;
import pl.dmcs.Sale.services.ReservationService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class ReservationController {
    ReservationService reservationService;

    @GetMapping("/reservations")
    public List<Reservation> getReservations() {
        return reservationService.getAllReservations();
    }
    @GetMapping("reservations/{email}")
    public List<Reservation> getReservationsByEmail(@PathVariable String email) {
        return reservationService.findByUserEmail(email);
    }
}
