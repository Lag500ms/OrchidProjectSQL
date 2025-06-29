package org.orchids.orchidbe.repository;

import org.orchids.orchidbe.pojo.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}


