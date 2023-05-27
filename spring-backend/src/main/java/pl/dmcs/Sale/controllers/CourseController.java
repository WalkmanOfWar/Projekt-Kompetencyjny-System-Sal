package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.Course;
import pl.dmcs.Sale.repositories.CourseRepository;
import pl.dmcs.Sale.services.CourseService;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class CourseController {
    private final CourseService courseService;
    @GetMapping("courses/id/{courseId}")
    public Optional<Course> getCourse(@PathVariable("courseId") String courseId) {
        return courseService.getCourseById(Long.parseLong(courseId));
    }

    @PostMapping("/new_course")
    Course newCourse(@RequestBody Course newCourse) {
        return courseService.saveNewCourse(newCourse);
    }

    @GetMapping("/courses")
    public List<Course> getCourses() {
        return courseService.getAllCourses();
    }

    @DeleteMapping("/delete_course/{id}")
    void deleteCourse(@PathVariable Long id) {
        courseService.deleteById(id);
    }

    @PutMapping("/update_course/{id}")
    void updateCourse(@PathVariable Long id, @RequestBody Course course) {
        courseService.updateCourseById(id,course);
    }

}
