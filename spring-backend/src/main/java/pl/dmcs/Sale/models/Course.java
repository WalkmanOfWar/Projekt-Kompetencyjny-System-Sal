package pl.dmcs.Sale.models;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Long course_type;

    @OneToOne
    @JoinColumn(name = "room_type_id")
    private RoomType roomType;
}
