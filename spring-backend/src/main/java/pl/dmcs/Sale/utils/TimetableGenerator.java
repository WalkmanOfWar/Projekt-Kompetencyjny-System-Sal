package pl.dmcs.Sale.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;
import pl.dmcs.Sale.models.ClassSchedule;
import pl.dmcs.Sale.models.Course;
import pl.dmcs.Sale.models.Room;
import pl.dmcs.Sale.models.User;
import pl.dmcs.Sale.services.ClassScheduleService;
import pl.dmcs.Sale.services.RoomService;

import java.sql.Time;
import java.time.LocalTime;
import java.util.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@Component
public class TimetableGenerator {
    private final RoomService roomService;
    private final ClassScheduleService classScheduleService;
    private List<ClassSchedule> acceptedClassSchedules;
    private List<Room> rooms;
    private final int MONDAY = 1, FRIDAY = 5;

    private void sortClassSchedules() {
//        acceptedClassSchedules.sort(
//                Comparator.comparing(ClassSchedule::getUser,
//                        Comparator.comparing(user -> user.getEmail().toLowerCase()))
//                        .thenComparingLong(ClassSchedule::getHours).reversed()
//                        .thenComparing(classSchedule -> classSchedule.getCourse().getName(), String.CASE_INSENSITIVE_ORDER)
//        );
        acceptedClassSchedules.sort(Comparator.comparing(classSchedule -> classSchedule.getDeanGroup().getName())); // grupy dziekańskie
    }

//    private void optimizeClassSchedules() {
//        Map<String, LocalTime> availableStartTimes = generateTimeMap(8, 19, 15);
//        Set<String> reservedTimesSet = new HashSet<>();
//        Set<ClassSchedule> updatedSchedules = new HashSet<>(); // Track updated class schedules
//        rooms.sort(Comparator.comparing(Room::getId));
//        System.out.println("Reservations size: " + acceptedClassSchedules.size());
//        for (long i = MONDAY; i <= FRIDAY; i++) {
//            for (Room room : rooms) {
//                for (ClassSchedule classSchedule : acceptedClassSchedules) {
//                    if (updatedSchedules.contains(classSchedule)) {
//                        // Skip class schedules that have already been updated
//                        continue;
//                    }
//
//                    // Get the required details from the class schedule
//                    Long requiredHours = classSchedule.getHours();
//
//                    // Iterate over the available time slots for the current room and day
//                    for (int startHour = 8; startHour <= 20 - requiredHours; startHour++) {
//                        String key = room.getName() + "_" + i + "_" + startHour;
//                        LocalTime startTime = availableStartTimes.get(key);
//
//                        // Check if the current time slot is not reserved and has enough hours available
//                        if (!reservedTimesSet.contains(key) && startTime != null) {
//                            boolean allHoursAvailable = true;
//                            for (int hour = startHour; hour < startHour + requiredHours; hour++) {
//                                String timeKey = room.getName() + "_" + i + "_" + hour;
//                                if (reservedTimesSet.contains(timeKey) || availableStartTimes.get(timeKey) == null) {
//                                    allHoursAvailable = false;
//                                    break;
//                                }
//                            }
//
//                            // If all hours are available, reserve the time slots
//                            if (allHoursAvailable) {
//                                for (int hour = startHour; hour < startHour + requiredHours; hour++) {
//                                    String timeKey = room.getName() + "_" + i + "_" + hour;
//                                    reservedTimesSet.add(timeKey);
//                                }
//
//                                // Update the start and end times in the class schedule
//                                classSchedule.setRoom(room);
//                                classSchedule.setDay_of_week(i);
//                                classSchedule.setStart_time(Time.valueOf(startTime));
//                                classSchedule.setEnd_time(Time.valueOf(startTime.plusHours(requiredHours).minusMinutes(15)));
//                                updatedSchedules.add(classSchedule); // Add class schedule to the updated set
//                                classScheduleService.update(classSchedule);
//                                break; // Move to the next class schedule
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        System.out.println("Class schedule generated");
//        // classScheduleService.updateAll(acceptedClassSchedules);
//    }
//
//    private Map<String, LocalTime> generateTimeMap(int startHour, int lastHour, int minutes) {
//        Map<String, LocalTime> availableStartTimes = new HashMap<>();
//        // klucz: Pokój_dzień_godzina
//        for(Room room: rooms) {
//            for(int i = MONDAY; i <= FRIDAY; i++) {
//                for(int start = startHour; start <= lastHour; start++) {
//                    String key = room.getName() + "_" + i + "_" + start;
//                    availableStartTimes.put(key, LocalTime.of(start,minutes));
//                }
//            }
//        }
//        return availableStartTimes;
//    }

    public void optimizeClassSchedules() {
        int roomPos = 0;
        long dayOfWeek = 1;
        int startHour = 8, minutes = 15;
        List<ClassSchedule> changedClassSchedules = new ArrayList<>();
        for(ClassSchedule classSchedule: acceptedClassSchedules) {
            if(rooms.size() - 1 == roomPos) {
                startHour = 8;
                roomPos = 0;
                if(dayOfWeek == 5L) {
                    break;
                }
                dayOfWeek++;
            }
            long hours = classSchedule.getHours();
            if(startHour + hours > 16) {
                startHour = 8;
                roomPos++;
            }

            Time newStartTime = Time.valueOf(LocalTime.of(startHour, minutes));
            Time newEndTime = Time.valueOf(LocalTime.of((int)(startHour + hours), 0));

            boolean slotAvailable = true;
            for(ClassSchedule check: changedClassSchedules) {
                if(check.getDay_of_week() == dayOfWeek) {
                    Time eStartTime = check.getStart_time();
                    Time eEndTime = check.getEnd_time();
                    System.out.printf("Nowe: [%s] | [%s]%n", newStartTime, newEndTime);
                    System.out.printf("Stare: [%s] | [%s]%n", eStartTime, eEndTime);
                    if(eStartTime.before(newEndTime) && eEndTime.after(newStartTime)) {
                        slotAvailable = false;
                        break;
                    }
                }
            }

            if(slotAvailable) {
                classSchedule.setStart_time(newStartTime);
                classSchedule.setEnd_time(newEndTime);
                classSchedule.setDay_of_week(dayOfWeek);
                classSchedule.setRoom(rooms.get(roomPos));
                classScheduleService.update(classSchedule);
                changedClassSchedules.add(classSchedule);
                System.out.printf("Class schedule [%d] updated\n", classSchedule.getId());
                startHour += hours;
            }
//            else { // nie udało się szukanie losowego innego dnia
//                int tempStartHour = startHour;
//                int tempRoomPos = 0;
//                long tempDayOfWeek = dayOfWeek + 1;
//
//                while(true) {
//                    if(rooms.size() - 1 == tempRoomPos) {
//                        tempStartHour = 8;
//                        tempRoomPos = 0;
//                        if(tempDayOfWeek == 5L) {
//                            break;
//                        }
//                        tempDayOfWeek++;
//                    }
//                    hours = classSchedule.getHours();
//                    if(tempStartHour + hours > 16) {
//                        tempStartHour = 8;
//                        tempRoomPos++;
//                    }
//                    slotAvailable = true;
//                    for(ClassSchedule check: changedClassSchedules) {
//                        if(check.getDay_of_week() == dayOfWeek) {
//                            Time eStartTime = check.getStart_time();
//                            Time eEndTime = check.getEnd_time();
//                            System.out.printf("Nowe: [%s] | [%s]%n", newStartTime, newEndTime);
//                            System.out.printf("Stare: [%s] | [%s]%n", eStartTime, eEndTime);
//                            if(eStartTime.before(newEndTime) && eEndTime.after(newStartTime)) {
//                                slotAvailable = false;
//                                break;
//                            }
//                        }
//                    }
//
//                    if(slotAvailable) {
//                        newStartTime = Time.valueOf(LocalTime.of(tempStartHour, minutes));
//                        newEndTime = Time.valueOf(LocalTime.of((int)(tempStartHour + hours), 0));
//                        classSchedule.setStart_time(newStartTime);
//                        classSchedule.setEnd_time(newEndTime);
//                        classSchedule.setDay_of_week(tempDayOfWeek);
//                        classSchedule.setRoom(rooms.get(tempRoomPos));
//                        classScheduleService.update(classSchedule);
//                        changedClassSchedules.add(classSchedule);
//                        System.out.printf("Class schedule [%d] updated\n", classSchedule.getId());
//                    }
//                }
//
//            }
        }
        System.out.println("Class schedules optimized");
    }


    public void generateTimetable() {
        acceptedClassSchedules = classScheduleService.getAllAcceptedClassSchedules();
        rooms = roomService.findAll();
        sortClassSchedules();
        optimizeClassSchedules();
    }
}
