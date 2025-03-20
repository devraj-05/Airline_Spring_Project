package org.example.spring_airline_project.DAO;


import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.example.spring_airline_project.entity.Flight_Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.Date;
import java.util.List;

@Repository
public class FlightDAO {

    private EntityManager entityManager ;
    @Autowired
    public FlightDAO(EntityManager newentityManager){
        entityManager = newentityManager ;
    }



    public List<Flight_Route> findAll() {

        TypedQuery<Flight_Route> theQuery = entityManager.createQuery("from Flight_Route ", Flight_Route.class);

        List<Flight_Route> flight = theQuery.getResultList();

        return flight;
    }


    public Flight_Route findById(int Id) {

        Flight_Route flight = entityManager.find(Flight_Route.class, Id);

        return flight;
    }

    public void save(Flight_Route flight) {

        Flight_Route dbflight = entityManager.merge(flight);


    }


    public void deleteById(int Id) {


        Flight_Route flight = entityManager.find(Flight_Route.class, Id);
        entityManager.remove(flight);


    }

    public List<Flight_Route> getFlightRoutesByCity(String departureCity, String destinationCity) {
        String query = "SELECT fr FROM Flight_Route fr WHERE fr.dept_city=:departureCity AND fr.dest_city = :destinationCity";
        return entityManager.createQuery(query, Flight_Route.class)
                .setParameter("departureCity", departureCity)
                .setParameter("destinationCity", destinationCity)
                .getResultList();
    }

    public List<Flight_Route> getFlightRoutesByDate(Date date) {
        TypedQuery<Flight_Route> query = entityManager.createQuery(
                "SELECT fr FROM Flight_Route fr WHERE fr.flight_date = :date", Flight_Route.class);
        query.setParameter("date", date);
        return query.getResultList();
    }
}
