package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.Room;
import pl.dmcs.Sale.services.RoomService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class RoomController {
    private final RoomService roomService;

    @GetMapping("/rooms")
    public List<Room> getRooms() {
        roomService.updateDescription();
        return roomService.findAll();
    }

    @GetMapping("/rooms/search")
    public ResponseEntity<List<Room>> searchRooms(@RequestParam(required = false) String facilities, @RequestParam(required = false) String minQuantities) {
        try {
            List<Room> rooms = roomService.findAll();
            roomService.updateDescription();

            if (facilities == null || facilities.isEmpty() || minQuantities == null || minQuantities.isEmpty()) {
                return new ResponseEntity<>(rooms, HttpStatus.OK);
            }

            // Teraz rozdzielamy ciągi znaków na tablice
            String[] facilityArray = facilities.split(",");
            String[] quantityArray = minQuantities.split(",");
            System.out.println(Arrays.toString(facilityArray));
            System.out.println(Arrays.toString(quantityArray));
            List<Room> matchingRooms = new ArrayList<>();
            for (Room room : rooms) {
                String description = room.getDescription();

                // Musimy teraz sprawdzić wszystkie udogodnienia
                boolean matchesAllFacilities = true;
                for (int i = 0; i < facilityArray.length; i++) {
                    String facility = facilityArray[i];
                    int minQuantity = Integer.parseInt(quantityArray[i]);

                    Pattern pattern = Pattern.compile(facility + ": (\\d+)");
                    Matcher matcher = pattern.matcher(description);
                    if (matcher.find()) {
                        int quantity = Integer.parseInt(matcher.group(1));
                        if (quantity < minQuantity) {
                            matchesAllFacilities = false;
                            break; // Pokój nie spełnia tego kryterium, możemy przerwać pętlę
                        }
                    } else {
                        matchesAllFacilities = false;
                        break; // Pokój nie ma tego udogodnienia, możemy przerwać pętlę
                    }
                }
                if (matchesAllFacilities) {
                    matchingRooms.add(room);
                }
            }

            if (matchingRooms.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(matchingRooms, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
