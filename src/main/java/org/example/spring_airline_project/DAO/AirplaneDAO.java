package org.example.spring_airline_project.DAO;


import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.example.spring_airline_project.entity.Airplane;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AirplaneDAO {
    private EntityManager entityManager ;
    @Autowired
    public AirplaneDAO(EntityManager newentityManager){
        entityManager = newentityManager ;
    }



    public List<Airplane> findAll() {

        TypedQuery<Airplane> theQuery = entityManager.createQuery("from Airplane ", Airplane.class);

        List<Airplane> plane = theQuery.getResultList();

        return plane;
    }


    public Airplane findById(int Id) {

        Airplane plane = entityManager.find(Airplane.class, Id);

        return plane;
    }

    public void save(Airplane plane) {

        entityManager.merge(plane);

    }


    public void deleteById(int Id) {


        Airplane plane = entityManager.find(Airplane.class, Id);
        entityManager.remove(plane);


    }

}

