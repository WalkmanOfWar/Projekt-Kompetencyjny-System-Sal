package pl.dmcs.Sale.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    @OneToMany
    @JoinColumn(name = "reservations")
    private List<Reservation> reservations;
}
