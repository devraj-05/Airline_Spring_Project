package org.example.spring_airline_project.controller;


import org.example.spring_airline_project.entity.Airplane;
import org.example.spring_airline_project.services.AirplaneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AirplaneRestController {


    private AirplaneService airplaneService;

    @Autowired
    public AirplaneRestController(AirplaneService AService) {
        airplaneService = AService;
    }

    @GetMapping("/airplane")
    public List<Airplane> findAll(){
        return airplaneService.findALl();
    }

    @GetMapping("/airplane/{id}")
    public Airplane findById(@PathVariable int id){

        Airplane plane = airplaneService.findById(id);

        if (plane == null) {
            throw new RuntimeException("Airplane not found : " + id);
        }

        return plane;
    }

    @PostMapping("/airplane")
    public Airplane addAirplane(@RequestBody Airplane plane){
        airplaneService.save(plane);
        return plane;
    }


    @PutMapping("/airplane")
    public Airplane updateAirplane(@RequestBody Airplane plane){
        airplaneService.save(plane);
        return plane;
    }

    @DeleteMapping("/airplane/{id}")
    public String deleteAirplane(@PathVariable int id){
        Airplane plane = airplaneService.findById(id);
        if(plane == null){
            throw new RuntimeException("Airplane not found : " + id);
        }
        airplaneService.deleteById(id);
        return "Deleted Airplane id : " + id ;

    }

}

