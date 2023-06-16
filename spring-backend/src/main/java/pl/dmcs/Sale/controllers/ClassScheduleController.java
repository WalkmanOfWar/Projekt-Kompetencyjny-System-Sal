package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.ClassSchedule;
import pl.dmcs.Sale.models.Reservation;
import pl.dmcs.Sale.services.ClassScheduleService;
import pl.dmcs.Sale.services.ReservationService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class ClassScheduleController {
    ClassScheduleService classScheduleService;
    ReservationService reservationService;

    @GetMapping("/class_schedules")
    public List<ClassSchedule> getClassSchedules() {
        return classScheduleService.getAll();
    }
    @PostMapping("/new_classSchedule")
    ClassSchedule newClassSchedule(@RequestBody ClassSchedule newClassSchedule) {
        try {
            ClassSchedule savedClassSchedule = classScheduleService.insertNewClassSchedule(newClassSchedule);
            Reservation reservation = new Reservation();
            reservation.setClassSchedule(savedClassSchedule);
            reservation.setStatus(0L);
//            reservation.setUser(savedClassSchedule.getUser());
            reservationService.insertNewReservation(reservation);
            return savedClassSchedule;
        } catch (Exception e) {
            return null;
        }
    }

    @DeleteMapping("/delete_schedule/{id}")
    void deleteClassSchedule(@PathVariable Long id) {
        classScheduleService.deleteClassScheduleById(id);
    }
    //todo: update classSchedule
    @PutMapping("/class_schedules/{id}")
    void updateClassSchedule(@PathVariable Long id, @RequestBody ClassSchedule classSchedule) {
        classScheduleService.updateClassScheduleById(id,classSchedule);
    }
}
