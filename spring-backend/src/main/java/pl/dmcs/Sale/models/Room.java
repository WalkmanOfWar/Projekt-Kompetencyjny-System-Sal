package pl.dmcs.Sale.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @JsonIgnoreProperties("room")
    @OneToMany(mappedBy = "room",
            orphanRemoval = true,
            cascade = CascadeType.ALL)
    private List<RoomFacility> roomFacilities;
}
