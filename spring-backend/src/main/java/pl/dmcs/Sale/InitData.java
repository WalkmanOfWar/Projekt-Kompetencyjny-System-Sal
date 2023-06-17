package pl.dmcs.Sale;

import jakarta.transaction.Transactional;
import org.apache.commons.lang3.RandomStringUtils;
import org.joda.time.DateTime;
import org.joda.time.Interval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import pl.dmcs.Sale.models.*;
import pl.dmcs.Sale.repositories.*;

import java.sql.Time;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

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

    @Autowired
    private PlatformTransactionManager transactionManager;

    private void testReservations() {
        Random rand = new Random();
        List<User> users = userRepository.findAll();
        List<Room> rooms = roomRepository.findAll();
        List<DeanGroup> deanGroups = deanGroupRepository.findAll();
        List<Reservation> savedReservations = new ArrayList<>();
        int roomPos = 0;
        long startWeek = 1, endWeek = 15;
        long parity = 0; // 0 brak, 1 - x1, 2 - x2
        long reservationStatus = 1; // 0 - niezaakceptowana, 1 - zaakceptowana, 2 - odrzucona
        int dayOfWeek = 1;
        boolean leave = false;
        int startHour = 8, minutes = 15;
        for (DeanGroup deanGroup : deanGroups) {
            if (leave) {
                break;
            }
            List<Course> courses = deanGroup.getCourses(); // kursy grupy dziekańskiej
            for (Course course : courses) {
                long hours = rand.nextInt(6) + 2;
                if (rooms.size() - 1 == roomPos) {
                    roomPos = 0;
                    startHour = 8;
                    if (dayOfWeek == 5L) {
                        leave = true;
                        break;
                    }
                    dayOfWeek++;
                }
                if (startHour + hours > 20) {
                    roomPos++;
                    startHour = 8;
                }

                Time startTime = Time.valueOf(LocalTime.of(startHour, minutes));
                Time endTime = Time.valueOf(LocalTime.of((int) (startHour + hours), 0));

                User foundUser = null;
                for (User user : users) {
                    boolean slotAvailable = true;
                    if (user.hasCourse(course)) {
                        List<Reservation> reservations = savedReservations.stream()
                                .filter(reservation -> reservation.getClassSchedule().getUser().equals(user))
                                .collect(Collectors.toList());
                        System.out.println("Reservations size: " + reservations.size());
                        for (Reservation reservation : reservations) {
                            ClassSchedule classSchedule = reservation.getClassSchedule();
                            System.out.printf("DAY of week [stary-nowy] [%d] [%d]\n", classSchedule.getDay_of_week(), dayOfWeek);
                            if (classSchedule.getDay_of_week() == dayOfWeek) {
                                Time eStartTime = classSchedule.getStart_time();
                                Time eEndTime = classSchedule.getEnd_time();
                                System.out.printf("Nowe: [%s] | [%s]\n", startTime, endTime);
                                System.out.printf("Stare: [%s] | [%s]\n", eStartTime, eEndTime);

                                DateTime start1 = new DateTime(startTime);
                                DateTime start2 = new DateTime(eStartTime);
                                DateTime end1 = new DateTime(endTime);
                                DateTime end2 = new DateTime(eEndTime);
                                Interval intervalNew = new Interval(start1, end1);
                                Interval intervalOld = new Interval(start2, end2);
                                if (intervalNew.overlaps(intervalOld) || intervalOld.overlaps(intervalNew)) {
                                    System.out.println("WYNIK: [FALSZ]");
                                    System.out.println("-----------------------------------");
                                    slotAvailable = false;
                                    break;
                                }
                            }
                        }
                        if (slotAvailable) {
                            System.out.println("WYNIK: [PRAWDA]");
                            System.out.println("-----------------------------------");
                            foundUser = user;
                            break;
                        }
                    }
                }
                if (foundUser == null) {
                    continue;
                }

                ClassSchedule classSchedule = ClassSchedule.builder()
                        .user(foundUser)
                        .course(course)
                        .room(rooms.get(roomPos))
                        .start_week(startWeek)
                        .end_week(endWeek)
                        .deanGroup(deanGroup)
                        .is_parity(parity)
                        .day_of_week((long) dayOfWeek)
                        .start_time(startTime)
                        .end_time(endTime)
                        .hours(hours)
                        .build();
                Reservation reservation = Reservation.builder()
                        .status(reservationStatus)
                        .classSchedule(classSchedule)
                        .build();

                savedReservations.add(reservation);
                saveReservation(reservation); // Call the method to save the reservation immediately
                startHour += hours;
            }
        }
        System.out.println("All schedules generated");
    }

    @Transactional
    public void saveReservation(Reservation reservation) {
        TransactionDefinition txDef = new DefaultTransactionDefinition();
        TransactionStatus txStatus = transactionManager.getTransaction(txDef);

        try {
            reservationRepository.saveAndFlush(reservation);
            transactionManager.commit(txStatus);
        } catch (Exception e) {
            transactionManager.rollback(txStatus);
            // Handle the exception
        }
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
//        reservationRepository.deleteAll();
//        testReservations();
//        delete();
//        deanGroupRepository.deleteAll();
//        courseRepository.deleteAll();
//        courseFacilityRepository.deleteAll();
//        userCourseRepository.deleteAll();
//        deanGroupRepository.deleteAll();
//        generateRandomCourses();
//        generateRandomCourseFacilities();
//        generateRandomUserCourses();
//        generateDeanGroups();
//        generateReservation();
//        generationsTestReservations();
//        generateReservations();
    }
}
