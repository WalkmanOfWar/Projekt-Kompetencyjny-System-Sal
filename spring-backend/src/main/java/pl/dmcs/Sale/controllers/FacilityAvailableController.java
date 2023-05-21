package pl.dmcs.Sale.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.Sale.models.FacilityAvailable;
import pl.dmcs.Sale.repositories.FacilityAvailableRepository;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class FacilityAvailableController {
    private final FacilityAvailableRepository facilityAvailableRepository;

    @PostMapping("/create_new_facility")
    FacilityAvailable newFacilityAvailable(@RequestBody FacilityAvailable facilityAvailable) {
        return facilityAvailableRepository.save(facilityAvailable);
    }

    @GetMapping("/facilities_available")
    public List<FacilityAvailable> getFacilitiesAvailable() {
        return facilityAvailableRepository.findAll();
    }

    @DeleteMapping("/delete_facility/{id}")
    void deleteFacilityAvailable(@PathVariable Long id) {
        facilityAvailableRepository.deleteById(id);
    }
}
