package org.example.spring_airline_project.controller;

import org.example.spring_airline_project.entity.Passenger;
import org.example.spring_airline_project.services.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PassengerRestController {


    private PassengerService passengerService;

    @Autowired
    public PassengerRestController(PassengerService PService) {
        passengerService = PService;
    }
    @GetMapping("/passengers")
    public List<Passenger> findAll(){
        return passengerService.findALl();
    }

    @GetMapping("/passengers/{id}")
    public Passenger findById(@PathVariable int id){

        Passenger psngr = passengerService.findById(id);

        if (psngr == null) {
            throw new RuntimeException("Passenger not found : " + id);
        }

        return psngr;
    }

    @PostMapping("/passengers")
    public Passenger addPassenger(@RequestBody Passenger psngr){
        passengerService.save(psngr);
        return psngr;
    }


    @PutMapping("/passengers")
    public Passenger updatePassenger(@RequestBody Passenger psngr){
        passengerService.save(psngr);
        return psngr;
    }

    @DeleteMapping("/passengers/{id}")
    public String deletePassenger(@PathVariable int id){
        Passenger psngr = passengerService.findById(id);
        if(psngr == null){
            throw new RuntimeException("Passenger not found : " + id);
        }
        passengerService.deleteById(id);
        return "Deleted Passenger id : " + id ;

    }


}

