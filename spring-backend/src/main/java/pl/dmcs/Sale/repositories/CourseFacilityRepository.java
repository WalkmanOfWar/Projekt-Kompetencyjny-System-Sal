package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.Course;
import pl.dmcs.Sale.models.CourseFacility;
import pl.dmcs.Sale.models.FacilityAvailable;
import pl.dmcs.Sale.models.User;

public interface CourseFacilityRepository extends JpaRepository<CourseFacility, Long> {
    boolean existsByCourseAndFacilityAvailable(Course course, FacilityAvailable facilityAvailable);
}