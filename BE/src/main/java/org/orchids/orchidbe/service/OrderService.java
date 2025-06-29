package org.orchids.orchidbe.service;

import org.orchids.orchidbe.dto.CreateOrderRequestDTO;
import org.orchids.orchidbe.dto.OrderItemDTO;
import org.orchids.orchidbe.pojo.Order;

public interface OrderService {
    Long createOrder(CreateOrderRequestDTO request);
    Order getOrderById(Long orderId);
    void addItemToOrder(Long orderId, OrderItemDTO item);
    void updateItemQuantity(Long orderId, Long detailId, int quantity);
    void removeItemFromOrder(Long orderId, Long detailId);
    void cancelOrder(Long orderId);
}

