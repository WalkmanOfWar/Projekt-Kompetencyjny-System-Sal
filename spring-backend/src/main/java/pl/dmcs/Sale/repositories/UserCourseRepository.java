package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.Course;
import pl.dmcs.Sale.models.User;
import pl.dmcs.Sale.models.UserCourse;

public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {
    boolean existsByUserAndCourse(User user, Course course);
}