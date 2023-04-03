package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}