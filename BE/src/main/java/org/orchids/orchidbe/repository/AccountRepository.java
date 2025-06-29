package org.orchids.orchidbe.repository;

import org.orchids.orchidbe.pojo.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    boolean existsByAccountName(String accountName);
    boolean existsByEmail(String email);
    Page<Account> findByaccountNameContainingIgnoreCase (String username, Pageable pageable);
    Optional<Account> findByAccountNameIgnoreCase(String accountName);
    Optional<Account> findByEmail(String email);
}
