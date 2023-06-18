package pl.dmcs.Sale.services;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.Sale.DTOs.LoginRequest;
import pl.dmcs.Sale.models.ClassSchedule;
import pl.dmcs.Sale.models.User;
import pl.dmcs.Sale.models.UserCourse;
import pl.dmcs.Sale.repositories.ClassScheduleRepository;
import pl.dmcs.Sale.repositories.UserCourseRepository;
import pl.dmcs.Sale.repositories.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final ClassScheduleRepository classScheduleRepository;
    private final UserRepository userRepository;
    private final UserCourseRepository userCourseRepository;

    public boolean isUserRegistered(String username) {
        return userRepository.findByEmail(username) != null;
    }
    public boolean isPasswordCorrect(String username, String password) {
        return userRepository.findByEmail(username).getPassword().equals(password);
    }

    public void registerUser(LoginRequest loginRequest) {
        User user = User.builder()
                .email(loginRequest.getEmail())
                .password(loginRequest.getPassword())
                .is_admin(false)
                .build();
        userRepository.save(user);
    }

    public User findByEmail(String username) {
        return userRepository.findByEmail(username);
    }

    public User save(User newUser) {
        return userRepository.save(newUser);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public void updateUser(long l, User user) {
        User existingUser = userRepository.findById(l).orElseThrow(() -> new IllegalArgumentException("Nie można znaleźć użytkownika o podanym id: " + l));
        existingUser.setLogin(user.getLogin());
        existingUser.setPassword(user.getPassword());
        existingUser.setIs_admin(user.getIs_admin());
        existingUser.setFirst_name(user.getFirst_name());
        existingUser.setLast_name(user.getLast_name());
        existingUser.setSeed(user.getSeed());
        existingUser.setEmail(user.getEmail());
        existingUser.setReservations(user.getReservations());
        userRepository.save(existingUser);
    }

    public void deleteById(long l) {
        List<UserCourse> userCourses = userCourseRepository.findAllByUserId(l);
        userCourseRepository.deleteAll(userCourses);
        userRepository.deleteById(l);
    }
}
