package pl.dmcs.Sale.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.Sale.models.FacilityAvailable;
import pl.dmcs.Sale.repositories.FacilityAvailableRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class FacilityAvailableService {
    private final FacilityAvailableRepository facilityAvailableRepository;

    public List<FacilityAvailable> getAllAvailableFacilities() {
        return facilityAvailableRepository.findAll();
    }

    public FacilityAvailable saveFacilityAvailable(FacilityAvailable facilityAvailable) {
        return facilityAvailableRepository.save(facilityAvailable);
    }
    public void deleteFacilityAvailable(Long id) {
        facilityAvailableRepository.deleteById(id);
    }
}
