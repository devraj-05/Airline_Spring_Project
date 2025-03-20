package org.example.spring_airline_project.DAO;


import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.example.spring_airline_project.entity.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class TicketDAO {

    private EntityManager entityManager ;
    @Autowired
    public TicketDAO(EntityManager newentityManager){
        entityManager = newentityManager ;
    }



    public List<Ticket> findAll() {

        TypedQuery<Ticket> theQuery = entityManager.createQuery("from Ticket ", Ticket.class);

        List<Ticket> ticket = theQuery.getResultList();

        return ticket;
    }


    public Ticket findById(int Id) {

        Ticket ticket = entityManager.find(Ticket.class, Id);

        return ticket;
    }

    public void save(Ticket ticket) {

        Ticket dbticket = entityManager.merge(ticket);
    }

    public void add(Ticket ticket)
    {
        int capacity = ticket.getF_id().getA_id().getCapacity();
        int curr_count =  (int) count(ticket.getF_id().getF_id());
        if(curr_count < capacity && ticket.getSeat_no() <= capacity )
        {
            save(ticket);
        }
        else{
            throw new RuntimeException("Full of capacity");
        }
    }


    public void deleteById(int Id) {


        Ticket ticket = entityManager.find(Ticket.class, Id);
        entityManager.remove(ticket);

    }



    public List<Ticket> getTicketsByPassengerId(int PId) {
        String query = "SELECT t FROM Ticket t WHERE t.p_id.p_id = :PId";
        return entityManager.createQuery(query, Ticket.class)
                .setParameter("PId", PId)
                .getResultList();
    }

    public List<Ticket> countTicketsByFlightRouteId(int flightRouteId) {
        String query = "SELECT t FROM Ticket t WHERE t.f_id.f_id = :flightRouteId";
        List<Ticket> totalticket =  entityManager.createQuery(query, Ticket.class)
                .setParameter("flightRouteId", flightRouteId)
                .getResultList();

        return totalticket ;
    }


    public long count(int flightRouteId) {
        String countquery = "SELECT COUNT(t) FROM Ticket t WHERE t.f_id.f_id = :flightRouteId" ;
        long count =  entityManager.createQuery(countquery, long.class)
                .setParameter("flightRouteId", flightRouteId)
                .getSingleResult();

        System.out.println(count);
        return count ;
    }

    public List<Ticket> getTicketsByPassengerName(String name) {
        String query = "SELECT t FROM Ticket t WHERE t.p_id.name= :name";
        return entityManager.createQuery(query, Ticket.class)
                .setParameter("name", name)
                .getResultList();

    }

}

