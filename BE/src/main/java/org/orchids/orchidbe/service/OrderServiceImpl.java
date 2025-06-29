package org.orchids.orchidbe.service;

import lombok.RequiredArgsConstructor;
import org.orchids.orchidbe.dto.CreateOrderRequestDTO;
import org.orchids.orchidbe.dto.OrderItemDTO;
import org.orchids.orchidbe.pojo.*;
import org.orchids.orchidbe.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final OrchidRepository orchidRepository;
    private final AccountRepository accountRepository;

    @Override
    @Transactional
    public Long createOrder(CreateOrderRequestDTO request) {
        Account account = accountRepository.findByAccountNameIgnoreCase(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Order order = new Order();
        order.setAccount(account);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(true);

        double total = 0.0;
        for (OrderItemDTO item : request.getItems()) {
            Orchid orchid = orchidRepository.findById(item.getOrchidId())
                    .orElseThrow(() -> new RuntimeException("Orchid not found"));

            OrderDetail detail = new OrderDetail();
            detail.setOrder(order);
            detail.setOrchid(orchid);
            detail.setQuantity(item.getQuantity());
            detail.setPrice(orchid.getPrice());
            total += orchid.getPrice() * item.getQuantity();
            order.getOrderDetails().add(detail);
        }

        order.setTotalAmount(total);
        return orderRepository.save(order).getId();
    }

    @Override
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    @Transactional
    public void addItemToOrder(Long orderId, OrderItemDTO item) {
        Order order = getOrderById(orderId);
        if (!order.getStatus()) throw new RuntimeException("Cannot modify a non-new order");

        Orchid orchid = orchidRepository.findById(item.getOrchidId())
                .orElseThrow(() -> new RuntimeException("Orchid not found"));

        OrderDetail detail = new OrderDetail();
        detail.setOrder(order);
        detail.setOrchid(orchid);
        detail.setQuantity(item.getQuantity());
        detail.setPrice(orchid.getPrice());
        order.getOrderDetails().add(detail);

        order.setTotalAmount(order.getTotalAmount() + detail.getPrice() * detail.getQuantity());
        orderRepository.save(order);
    }

    @Override
    @Transactional
    public void updateItemQuantity(Long orderId, Long detailId, int quantity) {
        Order order = getOrderById(orderId);
        if (!order.getStatus()) throw new RuntimeException("Cannot modify a non-new order");

        OrderDetail detail = orderDetailRepository.findById(detailId)
                .orElseThrow(() -> new RuntimeException("Detail not found"));

        double oldAmount = detail.getPrice() * detail.getQuantity();
        detail.setQuantity(quantity);
        double newAmount = detail.getPrice() * quantity;

        order.setTotalAmount(order.getTotalAmount() - oldAmount + newAmount);
        orderDetailRepository.save(detail);
    }

    @Override
    @Transactional
    public void removeItemFromOrder(Long orderId, Long detailId) {
        Order order = getOrderById(orderId);
        if (!order.getStatus()) throw new RuntimeException("Cannot modify a non-new order");

        OrderDetail detail = orderDetailRepository.findById(detailId)
                .orElseThrow(() -> new RuntimeException("Detail not found"));

        order.setTotalAmount(order.getTotalAmount() - detail.getPrice() * detail.getQuantity());
        orderDetailRepository.delete(detail);
    }

    @Override
    @Transactional
    public void cancelOrder(Long orderId) {
        Order order = getOrderById(orderId);
        order.setStatus(false);
        orderRepository.save(order);
    }
}
