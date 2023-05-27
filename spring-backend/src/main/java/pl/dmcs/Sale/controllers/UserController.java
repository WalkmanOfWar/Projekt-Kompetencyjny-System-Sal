package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.DTOs.LoginRequest;
import pl.dmcs.Sale.models.User;
import pl.dmcs.Sale.services.UserCourseService;
import pl.dmcs.Sale.services.UserService;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    UserService userService;
    UserCourseService userCourseService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getEmail();
        boolean isRegistered = userService.isUserRegistered(username);

        if (isRegistered) {
            String password = loginRequest.getPassword();
            if (userService.isPasswordCorrect(username, password)) {
                User user = userService.findByEmail(username);
                // zaloguj użytkownika
                return ResponseEntity.ok(user);
            } else {
                // zwróć błąd logowania
                return ResponseEntity.badRequest().body("Zły login lub hasło");
            }
        } else {
            // użytkownik nie istnieje w bazie danych
            // zwróć błąd logowania
            return ResponseEntity.badRequest().body("Użytkownik nie istnieje w bazie danych");
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        boolean isRegistered = userService.isUserRegistered(email);

        if (isRegistered) {
            // użytkownik już istnieje w bazie danych
            // zwróć błąd rejestracji
            return ResponseEntity.badRequest().body("Użytkownik już istnieje w bazie danych");
        } else {
            // zarejestruj użytkownika
            userService.registerUser(loginRequest);
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        User user = userService.findByEmail(email);
        System.out.println(user);

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/new_user")
    User newUser(@RequestBody User newUser) {
        return userService.save(newUser);
    }
}
