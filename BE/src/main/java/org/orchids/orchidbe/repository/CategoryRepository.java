package org.orchids.orchidbe.repository;

import org.orchids.orchidbe.pojo.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface  CategoryRepository extends JpaRepository<Category, Long> {
//    boolean existsByName(String name);
    Optional<Category> findByNameContainingIgnoreCase(String s);
}
