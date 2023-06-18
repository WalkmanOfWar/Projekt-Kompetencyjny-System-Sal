package pl.dmcs.Sale.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;
import pl.dmcs.Sale.models.*;
import pl.dmcs.Sale.repositories.*;
import pl.dmcs.Sale.services.ClassScheduleService;
import pl.dmcs.Sale.services.RoomService;
import pl.dmcs.Sale.services.UserService;

import java.sql.Time;
import java.time.LocalTime;
import java.util.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@Component
public class TimetableGenerator {
    private final RoomService roomService;
    private final ClassScheduleService classScheduleService;
    private final DeanGroupRepository deanGroupRepository;
    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final UserCourseRepository userCourseRepository;
    private final UserService userService;

    public void optimizeClassSchedules(int maxHours) {
        List<Room> rooms = roomRepository.findAll();
        List<Reservation> savedReservations = new ArrayList<>();
        List<User> users = userService.findAll();

        for(User user: users) {
            List<Reservation> reservations = user.getReservations();
            reservations.sort(
                    Comparator.comparing(
                            reservation -> reservation.getClassSchedule().getHours(),
                            Comparator.reverseOrder()
                    )
            );
            for(Reservation reservation: reservations) {
                ClassSchedule classSchedule = reservation.getClassSchedule();
                long hours = classSchedule.getHours();
                boolean exit = false;
                for(Room room: rooms) {
                    List<Reservation> roomReservations = savedReservations.stream().filter(res -> res.getClassSchedule().getRoom().equals(room)).toList();
                    List<Reservation> userReservations = savedReservations.stream().filter(res -> res.getClassSchedule().getUser().equals(user)).toList();
                    List<String> possibleRoomReservations = generateReservationsList((int)hours, roomReservations, maxHours);
                    List<String> possibleUserReservations = generateReservationsList((int)hours, userReservations, maxHours);
                    List<String> overlappingReservations = new ArrayList<>();

                    for (String roomReservation : possibleRoomReservations) {
                        for (String userReservation : possibleUserReservations) {
                            if (areReservationsOverlapping(userReservation, roomReservation)) {
                                overlappingReservations.add(roomReservation);
                            }
                        }
                    }

                    if(!overlappingReservations.isEmpty()) {
                        String possibleReservation = findMostOptimalReservation(overlappingReservations);
                        String[] parts = possibleReservation.split("_");
                        int newDayOfWeek = Integer.parseInt(parts[0]);
                        int newStartHour = Integer.parseInt(parts[1]);
                        int newEndHour = Integer.parseInt(parts[2]);

                        Time newStartTime = Time.valueOf(LocalTime.of(newStartHour, 15));
                        Time newEndTime = Time.valueOf(LocalTime.of(newEndHour, 0));

                        classSchedule.setDay_of_week((long)newDayOfWeek);
                        classSchedule.setStart_time(newStartTime);
                        classSchedule.setEnd_time(newEndTime);
                        classSchedule.setRoom(room);
                        reservation.setClassSchedule(classSchedule);
                        exit = true;
                        savedReservations.add(reservation);
                    }
                    if(exit) {
                        break;
                    }
                }
            }
        }

        reservationRepository.saveAll(savedReservations);
        System.out.println("Reservations generated");
    }

    private String findMostOptimalReservation(List<String> possibleReservations) {
        String best = possibleReservations.get(0);
        String[] bestParts = best.split("_");
        int bestStartHour = Integer.parseInt(bestParts[1]);
        for(String reservation: possibleReservations) {
            String[] parts = reservation.split("_");
            int startHour = Integer.parseInt(parts[1]);
            if(startHour < bestStartHour) {
                bestStartHour = startHour;
                best = reservation;
            }
        }

        return best;
    }
    private boolean areReservationsOverlapping(String reservation1, String reservation2) {
        String[] parts1 = reservation1.split("_");
        String[] parts2 = reservation2.split("_");

        int dayOfWeek1 = Integer.parseInt(parts1[0]);
        int startHour1 = Integer.parseInt(parts1[1]);
        int endHour1 = Integer.parseInt(parts1[2]);

        int dayOfWeek2 = Integer.parseInt(parts2[0]);
        int startHour2 = Integer.parseInt(parts2[1]);
        int endHour2 = Integer.parseInt(parts2[2]);

        return dayOfWeek1 == dayOfWeek2 && startHour1 == startHour2 && endHour1 == endHour2;
    }

    private List<String> generateReservationsList(int hours, List<Reservation> reservations, int maxHours) {
        List<String> possibleReservations = new ArrayList<>();
        for(int i = 1; i <= 5; i++) { // dayOfWeek_startHour_endHour
            for(int j = 8; j <= maxHours - hours; j++) {
                possibleReservations.add(String.format("%d_%d_%d", i, j, j + hours));
            }
        }

        for(Reservation roomReservation: reservations) {
            ClassSchedule classSchedule = roomReservation.getClassSchedule();
            Long dayOfWeek = classSchedule.getDay_of_week();
            int startHour = classSchedule.getStart_time().toLocalTime().getHour();
            int endHour = classSchedule.getEnd_time().toLocalTime().getHour();

            List<String> reservationsToRemove = new ArrayList<>();

            for (String reservation : possibleReservations) {
                String[] parts = reservation.split("_");
                int resDayOfWeek = Integer.parseInt(parts[0]);
                int resStartHour = Integer.parseInt(parts[1]);
                int resEndHour = Integer.parseInt(parts[2]);

                if (dayOfWeek == resDayOfWeek && testOverlap(startHour, endHour, resStartHour, resEndHour)) {
                    reservationsToRemove.add(reservation);
                }
            }

            possibleReservations.removeAll(reservationsToRemove);
        }

        return possibleReservations;
    }

    private boolean testOverlap(int x1, int x2, int y1, int y2) {
        return (x1 >= y1 && x1 < y2) ||
                (x2 > y1 && x2 <= y2) ||
                (y1 >= x1 && y1 < x2) ||
                (y2 > x1 && y2 <= x2);
    }

    public void generateTimetable() {
        optimizeClassSchedules(16);
    }
}
