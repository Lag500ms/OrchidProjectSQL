package org.orchids.orchidbe.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrchidResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String categoryName;
    private String imageUrl;
    private Double price;
    private Boolean isNatural;
}
