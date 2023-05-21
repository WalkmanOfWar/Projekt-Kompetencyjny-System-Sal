package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.dmcs.Sale.models.User;
import pl.dmcs.Sale.models.UserCourse;

import java.util.List;

public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {

    @Query("SELECT u FROM UserCourse u WHERE u.course.id = :courseId")
    List<UserCourse> findByCourseId(@Param("courseId") Long courseId);
}