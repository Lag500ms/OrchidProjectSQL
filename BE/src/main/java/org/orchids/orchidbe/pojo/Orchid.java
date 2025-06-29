package org.orchids.orchidbe.pojo;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "orchids")
public class Orchid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean isNatural;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private String name;

    private String orchidUrl;
    private Double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "orchid", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;
}