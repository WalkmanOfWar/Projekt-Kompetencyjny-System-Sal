package pl.dmcs.Sale;

import jakarta.transaction.Transactional;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import pl.dmcs.Sale.models.*;
import pl.dmcs.Sale.repositories.*;

import java.util.ArrayList;
import java.util.Random;

@Component
@Transactional
public class InitData implements ApplicationRunner {

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

    private void initializeData() {
        ArrayList<User> users = new ArrayList<>();
        Random rand = new Random();
        for(int i = 0; i < 20; i++) {
            String login = RandomStringUtils.randomAlphabetic(10);
            String password = RandomStringUtils.randomAlphabetic(10);
            Long seed = rand.nextLong(1000000,1500000);
            String firstName = RandomStringUtils.randomAlphabetic(10);
            String lastName = RandomStringUtils.randomAlphabetic(10);
            String email = RandomStringUtils.randomAlphabetic(10) + "@edu.p.lodz.pl";
            users.add(User.builder().login(login).password(password).seed(seed).first_name(firstName).last_name(lastName).email(email).is_admin(false).build());
        }
        userRepository.saveAll(users);

        ArrayList<RoomType> roomTypes = new ArrayList<>();
        roomTypes.add(RoomType.builder().room_name("Laboratorium").build());
        roomTypes.add(RoomType.builder().room_name("Sala wykładowa").build());
        roomTypes.add(RoomType.builder().room_name("Aula").build());
        roomTypeRepository.saveAll(roomTypes);

        ArrayList<Room> rooms = new ArrayList<>();
        for(int i = 0; i < 30; i++) {
            String name = "Sala " + (i + 1);
            int randRoomType = rand.nextInt(roomTypes.size());
            rooms.add(Room.builder().name(name).roomType(roomTypes.get(randRoomType)).description("").build());
        }
        roomRepository.saveAll(rooms);

        ArrayList<FacilityAvailable> availableFacilites = new ArrayList<>();
        availableFacilites.add(FacilityAvailable.builder().name("Komputer").build());
        availableFacilites.add(FacilityAvailable.builder().name("Miejsce siedzące").build());
        availableFacilites.add(FacilityAvailable.builder().name("Projektor").build());
        facilityAvailableRepository.saveAll(availableFacilites);

        ArrayList<RoomFacility> roomFacilities = new ArrayList<>();
        for(int i = 0; i < rooms.size(); i++) {
            Long randQuantity = rand.nextLong(5,30);
            roomFacilities.add(RoomFacility.builder().room(rooms.get(i)).quantity(randQuantity).description("").facilityAvailable(availableFacilites.get(0)).build());

            randQuantity = rand.nextLong(5,30);
            roomFacilities.add(RoomFacility.builder().room(rooms.get(i)).quantity(randQuantity).description("").facilityAvailable(availableFacilites.get(1)).build());

            randQuantity = rand.nextLong(1);
            roomFacilities.add(RoomFacility.builder().room(rooms.get(i)).quantity(randQuantity).description("").facilityAvailable(availableFacilites.get(2)).build());
        }
        roomFacilityRepository.saveAll(roomFacilities);

        ArrayList<Course> courses = new ArrayList<>();
        for(int i = 0; i < 15; i++) {
            String name = "Dante " + i;
            Long randCourseType = rand.nextLong(2);
            int randRoomType = rand.nextInt(roomTypes.size());
            courses.add(Course.builder().name(name).course_type(randCourseType).roomType(roomTypes.get(randRoomType)).build());
        }
        courseRepository.saveAll(courses);

        ArrayList<CourseFacility> courseFacilities = new ArrayList<>();
        for(int i = 0; i < courses.size(); i++) {
            Long randQuantity = rand.nextLong(5,30);
            courseFacilities.add(CourseFacility.builder().course(courses.get(i)).quantity(randQuantity).description("").facilityAvailable(availableFacilites.get(0)).build());

            randQuantity = rand.nextLong(5,30);
            courseFacilities.add(CourseFacility.builder().course(courses.get(i)).quantity(randQuantity).description("").facilityAvailable(availableFacilites.get(1)).build());

            randQuantity = rand.nextLong(1);
            courseFacilities.add(CourseFacility.builder().course(courses.get(i)).quantity(randQuantity).description("").facilityAvailable(availableFacilites.get(2)).build());
        }
        courseFacilityRepository.saveAll(courseFacilities);

        ArrayList<UserCourse> userCourses = new ArrayList<>();
        for(int i = 0; i < users.size(); i++) {
            int randCourse = rand.nextInt(courses.size());
            userCourses.add(UserCourse.builder().user(users.get(i)).course(courses.get(randCourse)).build());
        }
        userCourseRepository.saveAll(userCourses);

    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
      //  initializeData();
    }
}
