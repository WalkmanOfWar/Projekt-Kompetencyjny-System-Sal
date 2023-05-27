package pl.dmcs.Sale.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.Sale.models.ClassSchedule;
import pl.dmcs.Sale.repositories.ClassScheduleRepository;
import pl.dmcs.Sale.repositories.CourseRepository;

@Service
@AllArgsConstructor
public class ClassScheduleService {
    private final ClassScheduleRepository classScheduleRepository;


    public ClassSchedule insertNewClassSchedule(ClassSchedule newClassSchedule) {
        return classScheduleRepository.save(newClassSchedule);
    }

    public void deleteClassScheduleById(Long id) {
        classScheduleRepository.deleteById(id);
    }

    public void updateClassScheduleById(Long id, ClassSchedule classSchedule) {
        // Check if the classSchedule with the given id exists
        ClassSchedule existingClassSchedule = classScheduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ClassSchedule not found"));

        // Update the properties of the existing classSchedule
        existingClassSchedule.setDay_of_week(classSchedule.getDay_of_week());
        existingClassSchedule.setStart_time(classSchedule.getStart_time());
        existingClassSchedule.setEnd_time(classSchedule.getEnd_time());
        existingClassSchedule.setStart_week(classSchedule.getStart_week());
        existingClassSchedule.setEnd_week(classSchedule.getEnd_week());
        existingClassSchedule.setIs_parity(classSchedule.getIs_parity());
        existingClassSchedule.setCourse(classSchedule.getCourse());
        existingClassSchedule.setRoom(classSchedule.getRoom());
        existingClassSchedule.setUser(classSchedule.getUser());

        // Save the updated classSchedule
        classScheduleRepository.save(existingClassSchedule);
    }
}
