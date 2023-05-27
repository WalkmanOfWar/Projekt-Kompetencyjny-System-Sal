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
}
