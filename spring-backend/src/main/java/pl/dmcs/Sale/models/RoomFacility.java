package pl.dmcs.Sale.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "room_facilities")
public class RoomFacility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long quantity;
    private String description;

    @OneToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @OneToMany
    @JoinColumn(name = "facility_id")
    private List<FacilityAvailable> facilities;
}
