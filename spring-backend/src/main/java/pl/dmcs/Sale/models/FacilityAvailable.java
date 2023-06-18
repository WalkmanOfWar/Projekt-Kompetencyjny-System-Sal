package pl.dmcs.Sale.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "facilities_available")
public class FacilityAvailable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "facilityAvailable",
            orphanRemoval = true,
            cascade = CascadeType.ALL)
    private List<CourseFacility> courseFacilities;

    @JsonIgnore
    @OneToMany(mappedBy = "facilityAvailable",
            orphanRemoval = true,
            cascade = CascadeType.ALL)
    private List<RoomFacility> roomFacilties;
}
