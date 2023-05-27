package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.*;
import pl.dmcs.Sale.repositories.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class TempController {
    private final ClassScheduleRepository classScheduleRepository;
    private final CourseFacilityRepository courseFacilityRepository;
    private final ReservationRepository reservationRepository;
    private final RoomFacilityRepository roomFacilityRepository;


    @PostMapping("/new_reservation")
    Reservation newReservation(@RequestBody Reservation newReservation) {
        return reservationRepository.save(newReservation);
    }

    @GetMapping("/class_schedules")
    public List<ClassSchedule> getClassSchedules() {
        return classScheduleRepository.findAll();
    }


    @GetMapping("/course_facilities")
    public List<CourseFacility> getCourseFacilities() {
        return courseFacilityRepository.findAll();
    }
    @GetMapping("/room_facilities")
    public List<RoomFacility> getRoomFacilities() {
        return roomFacilityRepository.findAll();
    }


    @GetMapping("/class_schedules/room/id/{roomName}")
    public List<ClassSchedule> getClassSchedulesByRoomId(@PathVariable("roomName") String roomName) {
        return classScheduleRepository.findByRoomName(roomName);
    }

    @GetMapping("/class_schedules/room/name/{roomName}")
    public List<ClassSchedule> getClassSchedulesByRoomName(@PathVariable("roomName") String roomName) {
        System.out.println(roomName);
        System.out.println(classScheduleRepository.findByRoomName(roomName));
        return classScheduleRepository.findByRoomName(roomName);
    }


}
