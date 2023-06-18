package pl.dmcs.Sale.utils;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class CustomTimeDeserializer extends JsonDeserializer<Time> {
    private static final SimpleDateFormat TIME_FORMAT = new SimpleDateFormat("HH:mm");

    @Override
    public Time deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        String timeString = jsonParser.getText();
        try {
            java.util.Date parsedTime = TIME_FORMAT.parse(timeString);
            return new Time(parsedTime.getTime());
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid time format: " + timeString, e);
        }
    }
}
