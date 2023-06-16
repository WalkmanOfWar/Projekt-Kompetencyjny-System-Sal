package pl.dmcs.Sale.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import pl.dmcs.Sale.repositories.ClassScheduleRepository;
import pl.dmcs.Sale.repositories.ReservationRepository;
import pl.dmcs.Sale.services.ClassScheduleService;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "user_courses")
public class UserCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

//    @PreRemove
//    private void deleteAssociatedReservations() {
//        List<ClassSchedule> classSchedules = classScheduleRepository.findAllByCourse(course);
//        classScheduleRepository.deleteAll(classSchedules);
//    }
}
