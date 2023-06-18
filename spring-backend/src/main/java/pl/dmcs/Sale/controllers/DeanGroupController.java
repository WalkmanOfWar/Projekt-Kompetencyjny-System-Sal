package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.Course;
import pl.dmcs.Sale.models.DeanGroup;
import pl.dmcs.Sale.services.CourseService;
import pl.dmcs.Sale.services.DeanGroupService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class DeanGroupController
{
    private final DeanGroupService deanGroupService;
    private final CourseService courseService;

    @GetMapping("/dean-groups")
    public List<DeanGroup> getAll() {
        return deanGroupService.getAll();
    }

    @DeleteMapping("/dean_groups/{id}")
    public void deleteById(@PathVariable Long id) {
        deanGroupService.deleteById(id);
    }

    @GetMapping("/dean_groups/{id}/new_courses")
    public List<Course> getNewCoursesByDeanGroupId(@PathVariable Long id) {
        return courseService.getCoursesWithoutDeanGroupById(id);
    }

    @PutMapping("/dean-groups/{id}/courses/{courseId}")
    public void deleteCourseByCourseId(@PathVariable Long id, @PathVariable Long courseId) {
        System.out.println("ID: " + id + " | CourseID: " + courseId);
        deanGroupService.deleteCourseByCourseId(id, courseId);
    }

    @PutMapping("/dean_groups/{id}/new-course/{courseId}")
    public void addCourse(@PathVariable Long id, @PathVariable Long courseId) {
        deanGroupService.addCourseByCourseId(id, courseId);
    }
}
