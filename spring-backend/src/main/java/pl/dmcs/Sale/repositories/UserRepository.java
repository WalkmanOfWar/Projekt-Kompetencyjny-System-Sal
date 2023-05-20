package pl.dmcs.Sale.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.Sale.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}