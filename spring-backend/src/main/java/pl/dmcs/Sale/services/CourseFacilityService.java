package pl.dmcs.Sale.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.Sale.models.*;
import pl.dmcs.Sale.repositories.CourseFacilityRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class CourseFacilityService {
    private final CourseFacilityRepository courseFacilityRepository;

    public boolean existsByCourseAndFacility(Course course, FacilityAvailable facilityAvailable) {
        return courseFacilityRepository.existsByCourseAndFacilityAvailable(course, facilityAvailable);
    }
    public List<CourseFacility> getAllCourseFacilities() {
        return courseFacilityRepository.findAll();
    }

    public CourseFacility save(CourseFacility courseFacility) {
        return courseFacilityRepository.save(courseFacility);
    }

    public void deleteById(Long id) {
        courseFacilityRepository.deleteById(id);
    }

    public void updateCourseFacility(Long id, CourseFacility courseFacility) {
        CourseFacility existingCourseFacility = courseFacilityRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Nie można znaleźć połączeniu kurs-udogodnienie o podanym id: " + id));
        existingCourseFacility.setCourse(courseFacility.getCourse());
        existingCourseFacility.setFacilityAvailable(courseFacility.getFacilityAvailable());
        existingCourseFacility.setQuantity(courseFacility.getQuantity());
        existingCourseFacility.setDescription(courseFacility.getDescription());
        courseFacilityRepository.save(existingCourseFacility);
    }
}
