package org.example.spring_airline_project.entity;


import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Entity
@Table(name="flight_route")
public class Flight_Route {
    @Id
    @Column(name="f_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int f_id;


    @ManyToOne
    @JoinColumn(name="a_id")
    private Airplane a_id;

    @OneToMany(mappedBy = "f_id",cascade = CascadeType.ALL)
    private List<Ticket> tickets ;



    @Column(name="dept_city",nullable = false)
    private String dept_city;
    @Column(name="dest_city",nullable = false)
    private String dest_city;
    @Column(name="flight_date",nullable = false)
    private Date flight_date;
    @Column(name="dept_time",nullable = false)
    private Time dept_time;
    @Column(name="dest_time",nullable = false)
    private Time dest_time;
    @Column(name="price",nullable = false)
    private double price;


    public Flight_Route(Airplane a_id,String dept_city, String dest_city, Date flight_date, Time dept_time, Time dest_time, double price) {
        this.a_id = a_id;

        this.dept_city = dept_city;
        this.dest_city = dest_city;
        this.flight_date = flight_date;
        this.dept_time = dept_time;
        this.dest_time = dest_time;
        this.price = price;
    }

    public Flight_Route() {

    }

    public int getF_id() {
        return f_id;
    }

    public void setF_id(int f_id) {
        this.f_id = f_id;
    }

    public Airplane getA_id() {
        return this.a_id;
    }

    public void setA_id(Airplane a_id) {
        this.a_id = a_id;
    }

    public Date getFlight_date() {
        return flight_date;
    }

    public void setFlight_date(Date flight_date) {
        this.flight_date = flight_date;
    }

    public Time getDept_time() {
        return dept_time;
    }

    public void setDept_time(Time dept_time) {
        this.dept_time = dept_time;
    }

    public Time getDest_time() {
        return dest_time;
    }

    public void setDest_time(Time dest_time) {
        this.dest_time = dest_time;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDept_city() {
        return dept_city;
    }

    public String getDest_city() {
        return dest_city;
    }

    public void setDept_city(String dept_city) {
        this.dept_city = dept_city;
    }

    public void setDest_city(String dest_city) {
        this.dest_city = dest_city;
    }

    @Override
    public String toString() {
        return "Flight_Route{" +
                "f_id=" + f_id +
                ", a_id=" + a_id +
                ", dept_city='" + dept_city + '\'' +
                ", dest_city='" + dest_city + '\'' +
                ", flight_date=" + flight_date +
                ", dept_time=" + dept_time +
                ", dest_time=" + dest_time +
                ", price=" + price +
                '}';
    }

}

