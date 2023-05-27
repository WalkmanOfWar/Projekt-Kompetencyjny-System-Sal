package pl.dmcs.Sale.models;

import lombok.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "course_facilities")
public class CourseFacility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long quantity;
    private String description;

    @OneToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToOne
    @JoinColumn(name = "facility_id")
    private FacilityAvailable facilityAvailable;
//    @OneToMany
//    @JoinColumn(name = "facility_id")
//    private List<FacilityAvailable> facilities;
}
