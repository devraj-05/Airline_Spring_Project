package org.example.spring_airline_project.controller;

import org.example.spring_airline_project.entity.Flight_Route;
import org.example.spring_airline_project.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Date ;
import java.text.SimpleDateFormat;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class FlightRestController {


    private FlightService flightService;

    @Autowired
    public FlightRestController(FlightService FService) {
        flightService = FService;
    }
    @GetMapping("/flights")
    public List<Flight_Route> findAll(){
        return flightService.findALl();
    }

    @GetMapping("/flights/{id}")
    public Flight_Route findById(@PathVariable  int id){

        Flight_Route flight = flightService.findById(id);

        if (flight == null) {
            throw new RuntimeException("Flight not found : " + id);
        }

        return flight;
    }

    @PostMapping("/flights")
    public Flight_Route addFlightRoute(@RequestBody Flight_Route flight){
        flightService.save(flight);
        return flight;
    }


    @PutMapping("/flights")
    public Flight_Route updateFlightRoute(@RequestBody Flight_Route flight){
        flightService.save(flight);
        return flight;
    }

    @DeleteMapping("/flights/{id}")
    public String deleteFlightRoute(@PathVariable int id){
        Flight_Route flight = flightService.findById(id);
        if(flight == null){
            throw new RuntimeException("Flight not found : " + id);
        }
        flightService.deleteById(id);
        return "Deleted Flight id : " + id ;

    }

    @GetMapping("/flights/{departureCity}/{destinationCity}")
    public List<Flight_Route> getFlightRoutesByCity(@PathVariable String departureCity, @PathVariable String destinationCity)
    {
        List<Flight_Route> flightsByCity = flightService.getFlightRoutesByCity(departureCity, destinationCity);
        return flightsByCity ;
    }

    @GetMapping("/flights/date/{dateString}")
    public List<Flight_Route> getFlightRoutesByDate(@PathVariable String dateString) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date date = dateFormat.parse(dateString);
            return flightService.getFlightRoutesByDate(date);
        } catch (ParseException e) {
            // Handle parsing exception
            throw new IllegalArgumentException("Invalid date format. Please use yyyy-MM-dd format.", e);
        }
    }


}

