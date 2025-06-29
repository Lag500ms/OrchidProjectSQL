package org.orchids.orchidbe.dto;

import lombok.Data;

@Data
public class OrchidCreateDTO {
    private Boolean isNatural;
    private String description;
    private String name;
    private String orchidUrl;
    private Double price;
    private Long categoryId;
}
