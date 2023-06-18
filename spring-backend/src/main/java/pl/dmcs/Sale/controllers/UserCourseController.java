package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.User;
import pl.dmcs.Sale.models.UserCourse;
import pl.dmcs.Sale.repositories.UserCourseRepository;
import pl.dmcs.Sale.repositories.UserRepository;
import pl.dmcs.Sale.services.UserCourseService;
import pl.dmcs.Sale.services.UserService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class UserCourseController {

    UserCourseService userCourseService;

    @GetMapping("/user_courses")
    public List<UserCourse> getAll() {
        return userCourseService.findAll();
    }

    @PostMapping("/new_userCourse")
    public ResponseEntity<UserCourse> newUserCourse(@RequestBody UserCourse userCourse) {
        if (userCourseService.existsByUserAndCourse(userCourse.getUser(), userCourse.getCourse())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        UserCourse savedUserCourse = userCourseService.save(userCourse);
        return ResponseEntity.ok(savedUserCourse);
    }

    @GetMapping("/user_courses/{userID}")
    public List<UserCourse> getAllByUserId(@PathVariable Long userID) {
        return userCourseService.getByUserId(userID);
    }

    @GetMapping("/user_course")
    public List<UserCourse> getUserCourse() {
        return userCourseService.findAll();
    }


    @GetMapping("/userCourse/byCourseId/{courseId}")
    public ResponseEntity<List<UserCourse>> getUserByCourseId(@PathVariable Long courseId) {
        List<UserCourse> userCourses = userCourseService.findByCourseId(courseId);
        return ResponseEntity.ok(userCourses);
    }

    @DeleteMapping("/user_course/{id}")
    void deleteUserCourse(@PathVariable Long id) {
        userCourseService.deleteById(id);
    }
    @PutMapping("/user_course/{id}")
    void updateUserCourse(@PathVariable Long id, @RequestBody UserCourse userCourse) {
        userCourseService.updateUserCourse(id, userCourse);
    }

}
