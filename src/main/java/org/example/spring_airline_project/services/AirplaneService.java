package org.example.spring_airline_project.services;


import jakarta.persistence.TypedQuery;
import org.example.spring_airline_project.DAO.AirplaneDAO;
import org.example.spring_airline_project.entity.Airplane;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class AirplaneService {

    private AirplaneDAO airplaneDAO;

    @Autowired
    public AirplaneService(AirplaneDAO theAirplaneDAO) {
        airplaneDAO = theAirplaneDAO;
    }

    @Transactional
    public List<Airplane> findALl() {
        return airplaneDAO.findAll();
    }

    @Transactional
    public Airplane findById(int id) {
        return airplaneDAO.findById(id);
    }

    @Transactional
    public void save(Airplane plane) {
        airplaneDAO.save(plane) ;
    }

    @Transactional
    public void deleteById(int id) {
        airplaneDAO.deleteById(id);
    }
}
