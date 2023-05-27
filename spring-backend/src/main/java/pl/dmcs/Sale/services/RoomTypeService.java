package pl.dmcs.Sale.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.Sale.models.RoomType;
import pl.dmcs.Sale.repositories.RoomTypeRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RoomTypeService {
    private final RoomTypeRepository roomTypeRepository;


    public List<RoomType> findAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    public RoomType addNewRoomType(RoomType roomType) {
        return roomTypeRepository.save(roomType);
    }

    public void updateRoomType(Long id, RoomType roomType) {
        Optional<RoomType> optionalRoomType = roomTypeRepository.findById(id);
        if (optionalRoomType.isPresent()) {
            RoomType existingRoomType = optionalRoomType.get();
            existingRoomType.setRoom_name(roomType.getRoom_name());
            roomTypeRepository.save(existingRoomType);
        } else {
            throw new IllegalArgumentException("Nie można znaleźć typu sali o podanym id: " + id);
        }
    }

    public void deleteById(Long id) {
        roomTypeRepository.deleteById(id);
    }
}
