package pl.dmcs.Sale.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.Sale.models.Course;
import pl.dmcs.Sale.models.DeanGroup;
import pl.dmcs.Sale.repositories.CourseRepository;
import pl.dmcs.Sale.repositories.DeanGroupRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class DeanGroupService {
    private final DeanGroupRepository deanGroupRepository;
    private final CourseRepository courseRepository;

    public List<DeanGroup> getAll() {
        return deanGroupRepository.findAll();
    }

    public DeanGroup getById(Long id) {
        return deanGroupRepository.findById(id).orElseThrow();
    }

    public void deleteById(Long id) {
        DeanGroup deanGroup = deanGroupRepository.findById(id).orElseThrow();
        deanGroup.setCourses(null);
        deanGroupRepository.delete(deanGroup);
    }

    public void deleteCourseByCourseId(Long id, Long courseId) {
        DeanGroup deanGroup = deanGroupRepository.findById(id).orElseThrow();
        deanGroup.deleteCourseById(courseId);
        deanGroupRepository.save(deanGroup);
    }

    public void addCourseByCourseId(Long id, Long courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow();
        DeanGroup deanGroup = deanGroupRepository.findById(id).orElseThrow();
        deanGroup.getCourses().add(course);
        deanGroupRepository.save(deanGroup);
    }
}
