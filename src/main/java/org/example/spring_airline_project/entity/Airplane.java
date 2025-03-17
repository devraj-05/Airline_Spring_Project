package org.example.spring_airline_project.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="airplane")
public class Airplane {
    @Id
    @Column(name="a_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int a_id;

    @OneToMany(mappedBy = "a_id",cascade = CascadeType.ALL)
    private List<Flight_Route> flight_route ;


    @Column(name="name" ,nullable = false,length = 255)
    private String name;
    @Column(name="capacity",nullable = false)
    private int capacity;


    public Airplane(String name, int capacity) {

        this.name = name;
        this.capacity = capacity;
    }

    public Airplane() {

    }

    public int getA_id() {
        return a_id;
    }

    public void setA_id(int a_id) {
        this.a_id = a_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }



    @Override
    public String toString() {
        return "Airplane{" +
                "a_id=" + a_id +
                ", name='" + name + '\'' +
                ", capacity=" + capacity +
                '}';
    }
}

