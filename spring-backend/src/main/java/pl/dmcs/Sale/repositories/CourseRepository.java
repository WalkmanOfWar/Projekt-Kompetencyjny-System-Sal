package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.dmcs.Sale.models.Course;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    void deleteById(Long id);
    @Query("SELECT c FROM Course c LEFT JOIN c.deanGroups dg WHERE dg.id <> :deanGroupId OR dg.id IS NULL")
    List<Course> findCoursesWithoutDeanGroup(@Param("deanGroupId") Long deanGroupId);
}