package pl.dmcs.Sale.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String login;
    private String password;
    private Long seed;
    private String first_name;
    private String last_name;
    private String email;
    private Boolean is_admin;

    @JsonIgnoreProperties("user")
    @OneToMany(mappedBy = "user",
            orphanRemoval = true,
            cascade = CascadeType.ALL)
    private List<Reservation> reservations;

    @JsonIgnore
    @OneToMany(mappedBy = "user",
            orphanRemoval = true,
            cascade = CascadeType.ALL)
    private List<UserCourse> courses;

    public boolean hasCourse(Course course) {
        if (courses != null && course != null) {
            for (UserCourse userCourse : courses) {
                if (userCourse.getCourse().equals(course)) {
                    return true;
                }
            }
        }
        return false;
    }
}
