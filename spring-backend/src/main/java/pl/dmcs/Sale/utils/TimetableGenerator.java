package pl.dmcs.Sale.utils;

import org.springframework.stereotype.Component;
import pl.dmcs.Sale.models.*;
import pl.dmcs.Sale.repositories.*;
import pl.dmcs.Sale.services.ClassScheduleService;
import pl.dmcs.Sale.services.RoomService;
import pl.dmcs.Sale.services.UserService;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Component
public class TimetableGenerator {
    private final RoomService roomService;
    private final ClassScheduleService classScheduleService;
    private final DeanGroupRepository deanGroupRepository;
    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final UserCourseRepository userCourseRepository;
    private final UserService userService;

    public TimetableGenerator(RoomService roomService, ClassScheduleService classScheduleService, DeanGroupRepository deanGroupRepository,
                              ReservationRepository reservationRepository, RoomRepository roomRepository, UserCourseRepository userCourseRepository,
                              UserService userService) {
        this.roomService = roomService;
        this.classScheduleService = classScheduleService;
        this.deanGroupRepository = deanGroupRepository;
        this.reservationRepository = reservationRepository;
        this.roomRepository = roomRepository;
        this.userCourseRepository = userCourseRepository;
        this.userService = userService;
    }

    public void generateTimetable() {
        int maxHours = 16;
        TimetableOptimizer optimizer = new TimetableOptimizer(roomRepository, userService, reservationRepository);
        optimizer.optimizeClassSchedules(maxHours);
    }

    public void shuffleTimetable() {
        int maxHours = 20;
        TimetableOptimizer optimizer = new TimetableOptimizer(roomRepository, userService, reservationRepository);
        optimizer.optimizeClassSchedules(maxHours);
    }
}