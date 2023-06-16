package pl.dmcs.Sale.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import pl.dmcs.Sale.models.ClassSchedule;
import pl.dmcs.Sale.models.Reservation;
import pl.dmcs.Sale.models.Room;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Getter
@Setter
@AllArgsConstructor
public class TimetableGenerator {
    private List<Reservation> reservations;
    private List<Room> rooms;
    private int bestStartHour;
    private int bestEndHour;

    private void filterAcceptedReservations() {
        reservations = reservations.stream().filter(reservation -> reservation.getStatus().equals(1L)).collect(Collectors.toList());
    }

    private void sortReservations() {
        // najdłuższe rezerwacje -> grupy dziekańskie -> pełne rezerwacje -> x1 / x2
        // Sortowanie rezerwacji
        // Wyświetlanie posortowanych rezerwacji
        for (Reservation reservation : reservations) {
            System.out.println(reservation.getId());
        }
    }

    private void generateTimetable() {
        filterAcceptedReservations();
        sortReservations();
    }
}
