package pl.dmcs.Sale.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.Sale.models.Room;
import pl.dmcs.Sale.models.RoomFacility;
import pl.dmcs.Sale.repositories.RoomFacilityRepository;
import pl.dmcs.Sale.repositories.RoomRepository;

import java.util.*;

@Service
@AllArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomFacilityRepository roomFacilityRepository;

    public List<Room> findAll() {
        List<Room> rooms = roomRepository.findAll();
        rooms.sort(Comparator.comparing(Room::getName));
        return rooms;
    }

    public Room save(Room newRoom) {
        return roomRepository.save(newRoom);
    }

    public Optional<Room> findById(long l) {
        return roomRepository.findById(l);
    }

    public void deleteById(long l) {
        roomRepository.deleteById(l);
    }

    public void updateRoom(long l, Room room) {
        Optional<Room> optionalRoom = roomRepository.findById(l);
        if (optionalRoom.isPresent()) {
            Room existingRoom = optionalRoom.get();
            existingRoom.setName(room.getName());
            existingRoom.setRoomType(room.getRoomType());
            existingRoom.setDescription(room.getDescription());
            roomRepository.save(existingRoom);
        } else {
            throw new IllegalArgumentException("Nie można znaleźć sali o podanym id: " + l);
        }
    }

    public void updateDescription() {
        List<Room> rooms = findAll();
        List<RoomFacility> roomFacilities = roomFacilityRepository.findByRooms(rooms);
        Map<Room, StringBuilder> descriptionMap = new HashMap<>();

        for (RoomFacility roomFacility : roomFacilities) {
            Room room = roomFacility.getRoom();
            StringBuilder stringBuilder = descriptionMap.getOrDefault(room, new StringBuilder());

            stringBuilder.append(roomFacility.getFacilityAvailable().getName());
            stringBuilder.append(": ");
            stringBuilder.append(roomFacility.getQuantity());
            stringBuilder.append(",\n");

            descriptionMap.put(room, stringBuilder);
        }

        List<Room> roomsToUpdate = new ArrayList<>();
        for (Room room : rooms) {
            StringBuilder stringBuilder = descriptionMap.get(room);
            if (stringBuilder != null) {
                String description = stringBuilder.toString();
                room.setDescription(description);
                roomsToUpdate.add(room);
            }
        }

        if (!roomsToUpdate.isEmpty()) {
            roomRepository.saveAll(roomsToUpdate);
        }
    }
}
