package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
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

    @PutMapping("/reservations/{id}")
    public Reservation updateReservation(@PathVariable Long id, @RequestBody Reservation reservation) {
        return reservationService.updateReservation(id, reservation);
    }

    @PostMapping("/new_reservation")
    public void addReservation(@RequestBody Reservation reservation) {
        reservationService.insertNewReservation(reservation);
    }
}
