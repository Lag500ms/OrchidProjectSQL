package org.orchids.orchidbe.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.orchids.orchidbe.dto.CreateOrderRequestDTO;
import org.orchids.orchidbe.dto.OrderItemDTO;
import org.orchids.orchidbe.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderRequestDTO request) {
        Long orderId = orderService.createOrder(request);
        return ResponseEntity.ok(orderId);
    }

    @GetMapping("/{orderId}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> getOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    @PatchMapping("/{orderId}/add-item")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> addItemToOrder(@PathVariable Long orderId, @RequestBody OrderItemDTO item) {
        orderService.addItemToOrder(orderId, item);
        return ResponseEntity.ok("Item added");
    }

    @PatchMapping("/{orderId}/update-item")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> updateItemQuantity(@PathVariable Long orderId, @RequestParam Long orderDetailId, @RequestParam int quantity) {
        orderService.updateItemQuantity(orderId, orderDetailId, quantity);
        return ResponseEntity.ok("Item updated");
    }

    @DeleteMapping("/{orderId}/remove-item/{detailId}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> removeItemFromOrder(@PathVariable Long orderId, @PathVariable Long detailId) {
        orderService.removeItemFromOrder(orderId, detailId);
        return ResponseEntity.ok("Item removed");
    }

    @PatchMapping("/{orderId}/cancel")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok("Order cancelled");
    }
}
