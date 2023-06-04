package pl.dmcs.Sale.models;

import lombok.*;
import jakarta.persistence.*;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import pl.dmcs.Sale.CustomTimeDeserializer;

import java.sql.Time;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "class_schedules")
public class ClassSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long day_of_week;
    @JsonDeserialize(using = CustomTimeDeserializer.class)
    private Time start_time;
    @JsonDeserialize(using = CustomTimeDeserializer.class)
    private Time end_time;
    private Long start_week;
    private Long end_week;
    private Long is_parity;
    private Long hours;

    @OneToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}
