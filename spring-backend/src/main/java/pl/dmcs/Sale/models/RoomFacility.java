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
@Table(name = "room_facilities")
public class RoomFacility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long quantity;
    private String description;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @OneToOne
    @JoinColumn(name = "facility_id")
    private FacilityAvailable facilityAvailable;

//    @OneToMany
//    @JoinColumn(name = "facility_id")
//    private List<FacilityAvailable> facilities;
}
