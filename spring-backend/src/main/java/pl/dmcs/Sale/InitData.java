package pl.dmcs.Sale;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import pl.dmcs.Sale.models.*;
import pl.dmcs.Sale.repositories.*;

import java.sql.Time;
import java.time.LocalTime;
import java.util.*;

@Component
@Transactional
public class InitData implements ApplicationRunner {

    @Autowired
    private DeanGroupRepository deanGroupRepository;

    @Autowired
    private ClassScheduleRepository classScheduleRepository;

    @Autowired
    private CourseFacilityRepository courseFacilityRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private FacilityAvailableRepository facilityAvailableRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private RoomFacilityRepository roomFacilityRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private UserCourseRepository userCourseRepository;

    @Autowired
    private UserRepository userRepository;

//    private void initializeData() {
//        ArrayList<User> users = new ArrayList<>();
//        Random rand = new Random();
//        for(int i = 0; i < 20; i++) {
//            String login = RandomStringUtils.randomAlphabetic(10);
//            String password = RandomStringUtils.randomAlphabetic(10);
//            Long seed = rand.nextLong(1000000,1500000);
//            String firstName = RandomStringUtils.randomAlphabetic(10);
//            String lastName = RandomStringUtils.randomAlphabetic(10);
//            String email = RandomStringUtils.randomAlphabetic(10) + "@edu.p.lodz.pl";
//            users.add(User.builder().login(login).password(password).seed(seed).first_name(firstName).last_name(lastName).email(email).is_admin(false).build());
//        }
//        userRepository.saveAll(users);
//
//        ArrayList<RoomType> roomTypes = new ArrayList<>();
//        roomTypes.add(RoomType.builder().room_name("Laboratorium").build());
//        roomTypes.add(RoomType.builder().room_name("Sala wykładowa").build());
//        roomTypes.add(RoomType.builder().room_name("Aula").build());
//        roomTypeRepository.saveAll(roomTypes);
//
//        ArrayList<Room> rooms = new ArrayList<>();
//        for(int i = 0; i < 30; i++) {
//            String name = "Sala " + (i + 1);
//            int randRoomType = rand.nextInt(roomTypes.size());
//            rooms.add(Room.builder().name(name).roomType(roomTypes.get(randRoomType)).description("").build());
//        }
//        roomRepository.saveAll(rooms);
//
//        ArrayList<FacilityAvailable> availableFacilites = new ArrayList<>();
//        availableFacilites.add(FacilityAvailable.builder().name("Komputer").build());
//        availableFacilites.add(FacilityAvailable.builder().name("Miejsce siedzące").build());
//        availableFacilites.add(FacilityAvailable.builder().name("Projektor").build());
//        facilityAvailableRepository.saveAll(availableFacilites);
//
//        ArrayList<RoomFacility> roomFacilities = new ArrayList<>();
//        for(int i = 0; i < rooms.size(); i++) {
//            Long randQuantity = rand.nextLong(5,30);
//            roomFacilities.add(RoomFacility.builder().room(rooms.get(i)).quantity(randQuantity).description("").facilityAvailable(availableFacilites.get(0)).build());
//
//            randQuantity = rand.nextLong(5,30);
//            roomFacilities.add(RoomFacility.builder().room(rooms.get(i)).quantity(randQuantity).description("").facilityAvailable(availableFacilites.get(1)).build());
//
//            randQuantity = rand.nextLong(1);
//            roomFacilities.add(RoomFacility.builder().room(rooms.get(i)).quantity(randQuantity).description("").facilityAvailable(availableFacilites.get(2)).build());
//        }
//        roomFacilityRepository.saveAll(roomFacilities);
//
//        ArrayList<Course> courses = new ArrayList<>();
//        for(int i = 0; i < 15; i++) {
//            String name = "Dante " + i;
//            Long randCourseType = rand.nextLong(2);
//            int randRoomType = rand.nextInt(roomTypes.size());
//            courses.add(Course.builder().name(name).course_type(randCourseType).roomType(roomTypes.get(randRoomType)).build());
//        }
//        courseRepository.saveAll(courses);
//
//        ArrayList<CourseFacility> courseFacilities = new ArrayList<>();
//        for(int i = 0; i < courses.size(); i++) {
//            Long randQuantity = rand.nextLong(5,30);
//            courseFacilities.add(CourseFacility.builder().course(courses.get(i)).quantity(randQuantity).description("").facilityAvailable(availableFacilites.get(0)).build());
//
//            randQuantity = rand.nextLong(5,30);
//            courseFacilities.add(CourseFacility.builder().course(courses.get(i)).quantity(randQuantity).description("").facilityAvailable(availableFacilites.get(1)).build());
//
//            randQuantity = rand.nextLong(1);
//            courseFacilities.add(CourseFacility.builder().course(courses.get(i)).quantity(randQuantity).description("").facilityAvailable(availableFacilites.get(2)).build());
//        }
//        courseFacilityRepository.saveAll(courseFacilities);
//
//        ArrayList<UserCourse> userCourses = new ArrayList<>();
//        for(int i = 0; i < users.size(); i++) {
//            int randCourse = rand.nextInt(courses.size());
//            userCourses.add(UserCourse.builder().user(users.get(i)).course(courses.get(randCourse)).build());
//        }
//        userCourseRepository.saveAll(userCourses);
//
//    }
    private void generateRandomCourses() {
        List<RoomType> roomTypes = roomTypeRepository.findAll();
        Random rand = new Random();
        ArrayList<Course> courses = new ArrayList<>();
        for(int i = 0; i < 15; i++) {
            String name = "Dante " + i;
            int randCourseType = rand.nextInt(2);
            int randRoomType = rand.nextInt(roomTypes.size());
            courses.add(Course.builder().name(name).course_type((long)randCourseType).roomType(roomTypes.get(randRoomType)).build());
        }
        courseRepository.saveAll(courses);
    }

    private void generateRandomCourseFacilities() {
        Random rand = new Random();
        List<FacilityAvailable> availableFacilites = facilityAvailableRepository.findAll();
        List<Course> courses = courseRepository.findAll();
        ArrayList<CourseFacility> courseFacilities = new ArrayList<>();
        for(int i = 0; i < courses.size(); i++) {
            int randQuantity = rand.nextInt(30) + 5;
            courseFacilities.add(CourseFacility.builder().course(courses.get(i)).quantity((long)randQuantity).description("").facilityAvailable(availableFacilites.get(0)).build());

            randQuantity = rand.nextInt(30) + 5;
            courseFacilities.add(CourseFacility.builder().course(courses.get(i)).quantity((long)randQuantity).description("").facilityAvailable(availableFacilites.get(1)).build());

            randQuantity = rand.nextInt(2);
            courseFacilities.add(CourseFacility.builder().course(courses.get(i)).quantity((long)randQuantity).description("").facilityAvailable(availableFacilites.get(2)).build());
        }
        courseFacilityRepository.saveAll(courseFacilities);
    }

    private void generateRandomUserCourses() {
        Random rand = new Random();
        List<Course> courses = courseRepository.findAll();
        List<User> users = userRepository.findAll();
        ArrayList<UserCourse> userCourses = new ArrayList<>();
        for(int i = 0; i < users.size(); i++) {
            int randCourse = rand.nextInt(courses.size());
            userCourses.add(UserCourse.builder().user(users.get(i)).course(courses.get(randCourse)).build());
        }
        userCourseRepository.saveAll(userCourses);
    }

    public void generateReservations(int maxHours) {
        Random random = new Random();
        List<DeanGroup> deanGroups = deanGroupRepository.findAll();
        List<Room> rooms = roomRepository.findAll();
        List<Reservation> savedReservations = new ArrayList<>();

        for(DeanGroup deanGroup: deanGroups) {
            List<Course> courses = deanGroup.getCourses();
            for(Course course: courses) {
                List<UserCourse> userCourses = userCourseRepository.findByCourseId(course.getId());
                System.out.println("\n---------------USER COURSES " + userCourses.size());
                if(userCourses.isEmpty()) {
                   continue;
                }
                boolean exit = false;
                for(UserCourse userCourse: userCourses) {
                    int hours = random.nextInt(3) + 2;
                    User user = userCourse.getUser();
                    List<Reservation> userReservations = savedReservations.stream().filter(reservation -> reservation.getClassSchedule().getUser().equals(user)).toList();
                    System.out.println("USER RESERVATIONS " + userReservations.size());
                    for(Room room: rooms) {
                        List<Reservation> roomReservations = savedReservations.stream().filter(reservation -> reservation.getClassSchedule().getRoom().equals(room)).toList();
                        List<String> possibleRoomReservations = generateReservationsList(hours, roomReservations);
                        List<String> possibleUserReservations = generateReservationsList(hours, userReservations);
                        List<String> overlappingReservations = new ArrayList<>();

                        for (String roomReservation : possibleRoomReservations) {
                            for (String userReservation : possibleUserReservations) {
                                if (areReservationsOverlapping(userReservation, roomReservation)) {
                                    overlappingReservations.add(roomReservation);
                                }
                            }
                        }

                        if(!overlappingReservations.isEmpty()) {
                            String possibleReservation = overlappingReservations.get(0);
                            String[] parts = possibleReservation.split("_");
                            int newDayOfWeek = Integer.parseInt(parts[0]);
                            int newStartHour = Integer.parseInt(parts[1]);
                            int newEndHour = Integer.parseInt(parts[2]);

                            Time newStartTime = Time.valueOf(LocalTime.of(newStartHour, 15));
                            Time newEndTime = Time.valueOf(LocalTime.of(newEndHour, 0));

                            ClassSchedule classSchedule = ClassSchedule.builder()
                                    .user(user)
                                    .course(course)
                                    .room(room)
                                    .start_week(1L)
                                    .end_week(15L)
                                    .deanGroup(deanGroup)
                                    .is_parity(0L)
                                    .day_of_week((long)newDayOfWeek)
                                    .start_time(newStartTime)
                                    .end_time(newEndTime)
                                    .hours((long)hours)
                                    .build();
                            Reservation reservation = Reservation.builder()
                                    .status(1L)
                                    .classSchedule(classSchedule)
                                    .build();
                            exit = true;
                            savedReservations.add(reservation);
                        }
                        if(exit) {
                            break;
                        }
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

    private List<String> generateReservationsList(int hours, List<Reservation> reservations) {
        List<String> possibleReservations = new ArrayList<>();
        for(int i = 1; i <= 5; i++) { // dayOfWeek_startHour_endHour
            for(int j = 8; j <= 20 - hours; j++) {
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

    @Override
    public void run(ApplicationArguments args) throws Exception {
//        deanGroupRepository.deleteAll();
//        courseRepository.deleteAll();
//        courseFacilityRepository.deleteAll();
//        userCourseRepository.deleteAll();
//        deanGroupRepository.deleteAll();
//        reservationRepository.deleteAll();
//        generateReservations(20);
//        generateRandomCourses();
//        generateRandomCourseFacilities();
//        generateRandomUserCourses();
//        generateDeanGroups();
//        generateReservation();
//        generationsTestReservations();
//        generateReservations();
    }
}
