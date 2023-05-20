package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.dmcs.Sale.DTOs.LoginRequest;
import pl.dmcs.Sale.services.UserService;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getEmail();
        boolean isRegistered = userService.isUserRegistered(username);

        if (isRegistered) {
            String password = loginRequest.getPassword();
            if(userService.isPasswordCorrect(username, password)) {
                // zaloguj użytkownika
                return ResponseEntity.ok().build();
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
}
