package pl.dmcs.Sale.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.Sale.models.Course;
import pl.dmcs.Sale.repositories.CourseRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor

public class CourseService {
    private final CourseRepository courseRepository;

    public void updateCourseById(Long id, Course course) {
        // Check if the course with the given id exists
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));

        // Update the properties of the existing course
        existingCourse.setName(course.getName());
        existingCourse.setCourse_type(course.getCourse_type());
        existingCourse.setRoomType(course.getRoomType());

        // Save the updated course
        courseRepository.save(existingCourse);
    }

    public Optional<Course> getCourseById(long id) {
        return courseRepository.findById(id);
    }

    public Course saveNewCourse(Course newCourse) {
        return courseRepository.save(newCourse);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getCoursesWithoutDeanGroupById(Long id) {
        return courseRepository.findCoursesWithoutDeanGroup(id);
    }

    public void deleteById(Long id) {
        courseRepository.deleteById(id);
    }
}
