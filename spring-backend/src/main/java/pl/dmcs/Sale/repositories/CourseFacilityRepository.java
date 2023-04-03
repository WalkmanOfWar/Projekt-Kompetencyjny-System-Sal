package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.CourseFacility;

public interface CourseFacilityRepository extends JpaRepository<CourseFacility, Long> {
}