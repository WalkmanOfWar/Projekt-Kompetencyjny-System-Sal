package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.RoomType;
import pl.dmcs.Sale.services.RoomTypeService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class RoomTypeController {
    private final RoomTypeService roomTypeService;

    @PostMapping("/new_roomType")
    RoomType newRoomType(@RequestBody RoomType roomType) {
        return roomTypeService.addNewRoomType(roomType);
    }
    @GetMapping("/room_types")
    public List<RoomType> getRoomTypes() {
        return roomTypeService.findAllRoomTypes();
    }

    @PutMapping("/room_types/{id}")
    void updateRoomType(@PathVariable Long id, @RequestBody RoomType roomType) {
        roomTypeService.updateRoomType(id,roomType);
    }

    @DeleteMapping("/room_types/{id}")
    void deleteRoomType(@PathVariable Long id) {
        roomTypeService.deleteById(id);
    }
}
