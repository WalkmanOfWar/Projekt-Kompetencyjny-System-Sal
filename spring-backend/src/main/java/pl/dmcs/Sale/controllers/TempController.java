package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import pl.dmcs.Sale.repositories.*;

@AllArgsConstructor
@RestController
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
}
