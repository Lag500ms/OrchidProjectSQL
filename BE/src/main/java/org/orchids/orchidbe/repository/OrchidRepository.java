package org.orchids.orchidbe.repository;

import org.orchids.orchidbe.pojo.Orchid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrchidRepository extends JpaRepository<Orchid, Long> {
    List<Orchid> findAll();
    Page<Orchid> findBynameContainingIgnoreCase(String name, Pageable pageable);
//    Optional<Orchid> findByName(String s);
}
