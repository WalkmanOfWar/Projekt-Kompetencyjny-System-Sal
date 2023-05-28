package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.CourseFacility;
import pl.dmcs.Sale.models.RoomFacility;
import pl.dmcs.Sale.services.RoomFacilityService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class RoomFacilityController {
    private final RoomFacilityService roomFacilityService;
    @PostMapping("/new_roomFacility")
    public ResponseEntity<RoomFacility> newRoomFacility(@RequestBody RoomFacility roomFacility) {
        if (roomFacilityService.existsByRoomAndFacility(roomFacility.getRoom(), roomFacility.getFacilityAvailable())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        RoomFacility savedRoomFacility = roomFacilityService.save(roomFacility);
        return ResponseEntity.ok(savedRoomFacility);
    }

    @GetMapping("/room_facilities")
    public List<RoomFacility> findAllRoomFacilities() {
        return roomFacilityService.getAllRoomFacilities();
    }
    @DeleteMapping("/room_facility/{id}")
    void deleteRoomFacility(@PathVariable Long id) {
        roomFacilityService.deleteById(id);
    }
    @PutMapping("/room_facility/{id}")
    void updateRoomFacility(@PathVariable Long id, @RequestBody RoomFacility roomFacility) {
        roomFacilityService.updateRoomFacility(id, roomFacility);
    }
}
