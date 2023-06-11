package pl.dmcs.Sale.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.Sale.models.Course;
import pl.dmcs.Sale.models.User;
import pl.dmcs.Sale.models.UserCourse;
import pl.dmcs.Sale.repositories.UserCourseRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class UserCourseService {
    private final UserCourseRepository userCourseRepository;


    public boolean existsByUserAndCourse(User user, Course course) {
        return userCourseRepository.existsByUserAndCourse(user, course);
    }

    public UserCourse save(UserCourse userCourse) {
        return userCourseRepository.save(userCourse);
    }

    public List<UserCourse> findAll() {
        return userCourseRepository.findAll();
    }

    public List<UserCourse> findByCourseId(Long courseId) {
        return userCourseRepository.findByCourseId(courseId);
    }

    public void deleteById(Long id) {
        userCourseRepository.deleteById(id);
    }

    public void updateUserCourse(Long id, UserCourse userCourse) {
        UserCourse existingUserCourse = userCourseRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Nie można znaleźć użytkownika o podanym id: " + id));
        existingUserCourse.setCourse(userCourse.getCourse());
        existingUserCourse.setUser(userCourse.getUser());
        userCourseRepository.save(existingUserCourse);
    }

    public List<UserCourse> getByUserId(Long userID) {
        return userCourseRepository.findAllByUserId(userID);
    }
}
