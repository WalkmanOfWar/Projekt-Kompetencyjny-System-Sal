package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.RoomType;

public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {
}