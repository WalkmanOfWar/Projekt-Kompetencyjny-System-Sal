package pl.dmcs.Sale.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @OneToOne
    @JoinColumn(name = "room_type_id")
    private RoomType roomType;

    @OneToOne
    @JoinColumn(name = "facility_id")
    private FacilityAvailable facilityAvailable;

    @JsonIgnore
    @OneToMany(mappedBy = "room",
            orphanRemoval = true,
            cascade = CascadeType.ALL)
    private List<RoomFacility> roomFacilities;
}
