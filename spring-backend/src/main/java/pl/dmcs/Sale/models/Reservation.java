package pl.dmcs.Sale.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long status;

    @OneToOne
    @JoinColumn(name = "class_schedule_id")
    private ClassSchedule classSchedule;
}
