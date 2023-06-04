package pl.dmcs.Sale.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.Sale.models.*;
import pl.dmcs.Sale.repositories.RoomFacilityRepository;


import java.util.List;

@Service
@AllArgsConstructor
public class RoomFacilityService {
    private final RoomFacilityRepository roomFacilityRepository;
    public boolean existsByRoomAndFacility(Room room, FacilityAvailable facilityAvailable) {
        return roomFacilityRepository.existsByRoomAndFacilityAvailable(room, facilityAvailable);
    }
    public List<RoomFacility> getAllRoomFacilities() {
        return roomFacilityRepository.findAll();
    }
    public RoomFacility save(RoomFacility roomFacility) {
        return roomFacilityRepository.save(roomFacility);
    }

    public void deleteById(Long id) {
        roomFacilityRepository.deleteById(id);
    }
    public void updateRoomFacility(Long id, RoomFacility roomFacility) {
        RoomFacility existingRoomFacility = roomFacilityRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Nie można znaleźć połączeniu kurs-udogodnienie o podanym id: " + id));
        existingRoomFacility.setRoom(roomFacility.getRoom());
        existingRoomFacility.setFacilityAvailable(roomFacility.getFacilityAvailable());
        existingRoomFacility.setQuantity(roomFacility.getQuantity());
        existingRoomFacility.setDescription(roomFacility.getDescription());
        roomFacilityRepository.save(existingRoomFacility);
    }

    public List<RoomFacility> findByRoom(Room room) {
        return roomFacilityRepository.findByRoom(room);
    }
}
