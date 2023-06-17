package pl.dmcs.Sale.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
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

    @JsonIgnoreProperties("course")
    @OneToMany(mappedBy = "course",
            orphanRemoval = true,
            cascade = CascadeType.ALL)
    private List<CourseFacility> courseFacilities;

    @JsonIgnore
    @OneToMany(mappedBy = "course",
            orphanRemoval = true,
            cascade = CascadeType.ALL)
    private List<UserCourse> userCourses;

    @JsonIgnoreProperties("courses")
    @ManyToMany(mappedBy = "courses")
    private List<DeanGroup> deanGroups;
}
