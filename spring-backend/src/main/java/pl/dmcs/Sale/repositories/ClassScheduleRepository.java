package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.ClassSchedule;

public interface ClassScheduleRepository extends JpaRepository<ClassSchedule, Long> {
}