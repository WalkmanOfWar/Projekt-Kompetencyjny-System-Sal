package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.FacilityAvailable;
import pl.dmcs.Sale.services.FacilityAvailableService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class FacilityAvailableController {
    private final FacilityAvailableService facilityAvailableService;

    @PostMapping("/create_new_facility")
    FacilityAvailable newFacilityAvailable(@RequestBody FacilityAvailable facilityAvailable) {
        return facilityAvailableService.saveFacilityAvailable(facilityAvailable);
    }

    @GetMapping("/facilities_available")
    public List<FacilityAvailable> getFacilitiesAvailable() {
        return facilityAvailableService.getAllAvailableFacilities();
    }

    @DeleteMapping("/delete_facility/{id}")
    void deleteFacilityAvailable(@PathVariable Long id) {
        facilityAvailableService.deleteFacilityAvailable(id);
    }
}
