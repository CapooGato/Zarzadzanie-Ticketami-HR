package ticket_management_system.MASI.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ticket_management_system.MASI.user.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
}
