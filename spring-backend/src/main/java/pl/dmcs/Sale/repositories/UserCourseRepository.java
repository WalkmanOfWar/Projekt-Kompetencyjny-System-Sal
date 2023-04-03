package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.UserCourse;

public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {
}