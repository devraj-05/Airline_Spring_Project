package org.example.spring_airline_project.entity;


import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="ticket")
public class Ticket {
    @Id
    @Column(name="t_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int t_id;


    @ManyToOne
    @JoinColumn(name="p_id")
    private Passenger p_id;
    @ManyToOne
    @JoinColumn(name="f_id")
    private Flight_Route f_id;


    @Column(name="booking_date",nullable = false)
    private Date booking_date;
    @Column(name="seat_no",nullable = false)
    private int seat_no;

    public Ticket(int t_id, Passenger p_id, Flight_Route f_id, Date booking_date, int seat_no) {
        this.t_id = t_id;
        this.p_id = p_id;
        this.f_id = f_id;
        this.booking_date = booking_date;
        this.seat_no = seat_no;
    }

    public Ticket() {

    }

    public int getT_id() {
        return t_id;
    }

    public void setT_id(int t_id) {
        this.t_id = t_id;
    }

    public Passenger getP_id() {
        return this.p_id;
    }

    public void setP_id(Passenger p_id) {
        this.p_id = p_id;
    }

    public Flight_Route getF_id() {
        return this.f_id;
    }

    public void setF_id(Flight_Route f_id) {
        this.f_id = f_id;
    }

    public Date getBooking_date() {
        return booking_date;
    }

    public void setBooking_date(Date booking_date) {
        this.booking_date = booking_date;
    }

    public int getSeat_no() {
        return seat_no;
    }

    public void setSeat_no(int seat_no) {
        this.seat_no = seat_no;
    }


    @Override
    public String toString() {
        return "Ticket{" +
                "T_id=" + t_id +
                ", P_id=" + p_id +
                ", F_id=" + f_id +
                ", booking_date=" + booking_date +
                ", seat_no=" + seat_no +
                '}';
    }
}


