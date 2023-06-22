package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.*;
import pl.dmcs.Sale.repositories.CourseRepository;
import pl.dmcs.Sale.repositories.DeanGroupRepository;
import pl.dmcs.Sale.repositories.RoomRepository;
import pl.dmcs.Sale.repositories.UserRepository;
import pl.dmcs.Sale.services.ClassScheduleService;
import pl.dmcs.Sale.services.ReservationService;
import pl.dmcs.Sale.utils.TimetableGenerator;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class ClassScheduleController {
    ClassScheduleService classScheduleService;
    ReservationService reservationService;
    TimetableGenerator timetableGenerator;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final DeanGroupRepository deanGroupRepository;
    private final CourseRepository courseRepository;

    @GetMapping("/class_schedules")
    public List<ClassSchedule> getClassSchedules() {
        return classScheduleService.getAll();
    }

    @GetMapping("/class_schedules/accepted")
    public List<ClassSchedule> getAllAcceptedClassSchedules() {
        return classScheduleService.getAllAcceptedClassSchedules();
    }

    @GetMapping("/class_schedules/room/name/{roomName}")
    public List<ClassSchedule> getClassSchedulesByRoomName(@PathVariable String roomName) {
        return classScheduleService.getAllAcceptedClassSchedulesByRoomName(roomName);
    }

    @GetMapping("/class_schedules/dean-group/name/{deanGroupName}")
    public List<ClassSchedule> getClassSchedulesByDeanGroupName(@PathVariable String deanGroupName) {
        return classScheduleService.getAllAcceptedClassSchedulesByDeanGroupName(deanGroupName);
    }


    @PutMapping("/generate-classSchedules")
    public void generateClassSchedules() {
        System.out.println("HERE");
        timetableGenerator.generateTimetable();
    }

    @PutMapping("/shuffle-classSchedules")
    public void shuffleClassSchedules() {
        timetableGenerator.shuffleTimetable();
    }

    @PostMapping("/new_classSchedule")
    ClassSchedule newClassSchedule(@RequestBody ClassSchedule newClassSchedule) {
        try {
            System.out.println(newClassSchedule);
            User user = userRepository.findById(newClassSchedule.getUser().getId()).orElseThrow();
            DeanGroup deanGroup = deanGroupRepository.findById(newClassSchedule.getDeanGroup().getId()).orElseThrow();
            Room room = roomRepository.findById(newClassSchedule.getRoom().getId()).orElseThrow();
            Course course = courseRepository.findById(newClassSchedule.getCourse().getId()).orElseThrow();
            newClassSchedule.setRoom(room);
            newClassSchedule.setUser(user);
            newClassSchedule.setDeanGroup(deanGroup);
            newClassSchedule.setCourse(course);
            ClassSchedule savedClassSchedule = classScheduleService.insertNewClassSchedule(newClassSchedule);
            Reservation reservation = new Reservation();
            reservation.setClassSchedule(savedClassSchedule);
            reservation.setStatus(0L);
            reservation.setUser(savedClassSchedule.getUser());
            reservationService.insertNewReservation(reservation);
            return savedClassSchedule;
        } catch (Exception e) {
            System.out.println(newClassSchedule);
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
