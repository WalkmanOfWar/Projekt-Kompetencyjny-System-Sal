package pl.dmcs.Sale;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import pl.dmcs.Sale.models.User;
import pl.dmcs.Sale.repositories.*;

import java.util.ArrayList;

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
        for(int i = 0; i < 20; i++) {
            users.add(User.)
        }
        userRepository.saveAll(users);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        initializeData();
    }
}
