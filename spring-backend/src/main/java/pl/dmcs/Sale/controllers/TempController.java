package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.*;
import pl.dmcs.Sale.repositories.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class TempController {
    private final ClassScheduleRepository classScheduleRepository;
    private final CourseFacilityRepository courseFacilityRepository;
    private final CourseRepository courseRepository;
    private final FacilityAvailableRepository facilityAvailableRepository;
    private final ReservationRepository reservationRepository;
    private final RoomFacilityRepository roomFacilityRepository;
    private final RoomRepository roomRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final UserCourseRepository userCourseRepository;
    private final UserRepository userRepository;

    @PostMapping("/new_user")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    @GetMapping("/courses")
    public List<Course> getCourses() {
        return courseRepository.findAll();
    }
    @GetMapping("/user_course")
    public List<UserCourse> getUserCourse() {
        return userCourseRepository.findAll();
    }
    @GetMapping("/class_schedules")
    public List<ClassSchedule> getClassSchedules() {
        return classScheduleRepository.findAll();
    }
    @GetMapping("/rooms")
    public List<Room> getRooms() {
        return roomRepository.findAll();
    }
    @GetMapping("/room_types")
    public List<RoomType> getRoomTypes() {
        return roomTypeRepository.findAll();
    }
    @GetMapping("/course_facilities")
    public List<CourseFacility> getCourseFacilities() {
        return courseFacilityRepository.findAll();
    }
    @GetMapping("/room_facilities")
    public List<RoomFacility> getRoomFacilities() {
        return roomFacilityRepository.findAll();
    }
    @GetMapping("/facilities_available")
    public List<FacilityAvailable> getFacilitiesAvailable() {
        return facilityAvailableRepository.findAll();
    }
    @GetMapping("/reservations")
    public List<Reservation> getReservations() {
        return reservationRepository.findAll();
    }
}
