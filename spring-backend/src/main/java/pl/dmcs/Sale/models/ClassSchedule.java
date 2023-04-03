package pl.dmcs.Sale.models;

import lombok.*;
import jakarta.persistence.*;

import java.sql.Time;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "class_schedule")
public class ClassSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long day_of_week;
    private Time start_time;
    private Time end_time;
    private Long start_week;
    private Long end_week;
    private Boolean is_parity;


    private Long time_date_id;

    @OneToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
