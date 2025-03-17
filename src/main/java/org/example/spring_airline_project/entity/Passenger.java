package org.example.spring_airline_project.entity;


import jakarta.persistence.*;
import org.springframework.lang.NonNull;

import java.util.List;

@Entity
@Table(name="passenger")
public class Passenger {
    @Id
    @Column(name="p_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int p_id ;

    @OneToMany(mappedBy = "p_id" ,cascade = CascadeType.ALL)
    private List<Ticket> tickets;


    @Column(name="name",length = 100 , nullable = false)
    private String name;
    @Column(name="email",length = 100, nullable = false)
    private String email;
    @Column(name="phone",length = 10,nullable = false)
    private String phone;


    public Passenger(String name, String email, String phone) {

        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    public Passenger() {

    }

    public int getP_id() {
        return p_id;
    }

    public void setP_id(int p_id) {
        this.p_id = p_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }



    @Override
    public String toString() {
        return "Passenger{" +
                "p_id=" + p_id +
                ", tickets=" + tickets +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone=" + phone +
                '}';
    }
}

