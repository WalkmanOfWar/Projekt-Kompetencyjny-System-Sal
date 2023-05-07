package pl.dmcs.Sale.services;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.Sale.DTOs.LoginRequest;
import pl.dmcs.Sale.models.User;
import pl.dmcs.Sale.repositories.UserRepository;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;

    public boolean isUserRegistered(String username) {
        return userRepository.findByEmail(username) != null;
    }
    public boolean isPasswordCorrect(String username, String password) {
        return userRepository.findByEmail(username).getPassword().equals(password);
    }

    public void registerUser(LoginRequest loginRequest) {
        User user = User.builder()
                .email(loginRequest.getEmail())
                .password(loginRequest.getPassword())
                .is_admin(false)
                .build();
        userRepository.save(user);
    }
}
