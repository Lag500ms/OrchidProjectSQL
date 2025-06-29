package org.orchids.orchidbe.repository;

import org.orchids.orchidbe.pojo.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
}
