package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.DeanGroup;

public interface DeanGroupRepository extends JpaRepository<DeanGroup, Long> {
}