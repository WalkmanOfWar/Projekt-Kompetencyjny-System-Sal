package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.Room;
import pl.dmcs.Sale.services.RoomService;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class RoomController {
    private final RoomService roomService;

    @GetMapping("/rooms")
    public List<Room> getRooms() {
        return roomService.findAll();
    }

    @PostMapping("/new_room")
    Room newRoom(@RequestBody Room newRoom) {
        return roomService.save(newRoom);
    }

    @GetMapping("rooms/id/{roomId}")
    public Optional<Room> getRoom(@PathVariable("roomId") String roomId) {
        return roomService.findById(Long.parseLong(roomId));
    }

    @DeleteMapping("rooms/{roomId}")
    void deleteRoom(@PathVariable("roomId") String roomId) {
        roomService.deleteById(Long.parseLong(roomId));
    }

    @PutMapping("rooms/{roomId}")
    void updateRoom(@PathVariable("roomId") String roomId, @RequestBody Room room) {
        roomService.updateRoom(Long.parseLong(roomId), room);
    }
}
