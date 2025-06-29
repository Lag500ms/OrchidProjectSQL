package org.orchids.orchidbe.dto;

import lombok.Data;
import java.util.List;

@Data
public class CreateOrderRequestDTO {
    private String username;
    private List<OrderItemDTO> items;
}
