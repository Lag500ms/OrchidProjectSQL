package org.orchids.orchidbe.dto;

import lombok.Data;
import org.orchids.orchidbe.pojo.Category;

@Data
public class OrchidRequestDTO {
    private Boolean isNatural;
    private String description;
    private String name;
    private String orchidUrl;
    private Double price;
    private Category category;
}
