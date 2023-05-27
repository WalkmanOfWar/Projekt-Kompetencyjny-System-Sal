package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.CourseFacility;
import pl.dmcs.Sale.models.UserCourse;
import pl.dmcs.Sale.services.CourseFacilityService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class CourseFacilityController {
    private final CourseFacilityService courseFacilityService;

    @PostMapping("/new_courseFacility")
    public ResponseEntity<CourseFacility> newCourseFacility(@RequestBody CourseFacility courseFacility) {
        if (courseFacilityService.existsByCourseAndFacility(courseFacility.getCourse(), courseFacility.getFacilityAvailable())) {
            System.out.println("Here");
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        CourseFacility savedCourseFacility = courseFacilityService.save(courseFacility);
        return ResponseEntity.ok(savedCourseFacility);
    }

    @GetMapping("/course_facilities")
    public List<CourseFacility> findAllCourseFacilities() {
        return courseFacilityService.getAllCourseFacilities();
    }

    @DeleteMapping("/course_facility/{id}")
    void deleteCourseFacility(@PathVariable Long id) {
        courseFacilityService.deleteById(id);
    }
    @PutMapping("/course_facility/{id}")
    void updateCourseFacility(@PathVariable Long id, @RequestBody CourseFacility courseFacility) {
        courseFacilityService.updateCourseFacility(id, courseFacility);
    }
}
