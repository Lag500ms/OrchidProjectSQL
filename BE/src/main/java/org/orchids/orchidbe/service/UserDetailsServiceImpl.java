package org.orchids.orchidbe.service;

import org.orchids.orchidbe.dto.ForgetPassworDTO;
import org.springframework.transaction.annotation.Transactional;
import org.orchids.orchidbe.dto.AccountRequestDTO;
import org.orchids.orchidbe.dto.AccountResponseDTO;
import org.orchids.orchidbe.pojo.Account;
import org.orchids.orchidbe.pojo.Role;
import org.orchids.orchidbe.repository.AccountRepository;
import org.orchids.orchidbe.repository.RoleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;

    public UserDetailsServiceImpl(AccountRepository accountRepository, RoleRepository roleRepository) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
    }

    //danh sach tai koan de quan ly
    @Override
    public Page<AccountResponseDTO> getAccounts(Pageable pageable, String keywords) {
        Page<Account> accountsPage;

        if (keywords == null || keywords.isBlank()) {
            accountsPage = accountRepository.findAll(pageable);
        } else {
            accountsPage = accountRepository.findByaccountNameContainingIgnoreCase(keywords, pageable);
        }

        return accountsPage.map(account -> {
            AccountResponseDTO dto = new AccountResponseDTO();
            dto.setId(account.getId());
            dto.setName(account.getAccountName());
            dto.setEmail(account.getEmail());
            dto.setRoleName(account.getRole().getRoleName());
            return dto;
        });
    }


    //tao tai khoan
    @Transactional
    @Override
    public Account createAccount(AccountRequestDTO account) {
        if (account.getName() == null || account.getEmail() == null || account.getPassword() == null) {
            throw new IllegalArgumentException("Account name, email, and password must not be null");
        }
        if (accountRepository.existsByAccountName(account.getName())) {
            throw new IllegalArgumentException("Account name already exists");
        }
        if (accountRepository.existsByEmail(account.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        Account newAccount = new Account();
        newAccount.setAccountName(account.getName());
        newAccount.setEmail(account.getEmail());
        newAccount.setPassword(account.getPassword());
        Role defaultRole = roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new IllegalArgumentException("Default role not found"));
        newAccount.setRole(defaultRole);
        return accountRepository.save(newAccount);
    }

    //sua tai khoan
    @Transactional
    @Override
    public Account updateAccount(Long id, AccountRequestDTO account) {
        Account existingAccount = accountRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));

        if (!existingAccount.getAccountName().equals(account.getName()) &&
            accountRepository.existsByAccountName(account.getName())) {
            throw new IllegalArgumentException("Account name already exists");
        }

        if (!existingAccount.getEmail().equals(account.getEmail()) &&
            accountRepository.existsByEmail(account.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        existingAccount.setAccountName(account.getName());
        existingAccount.setEmail(account.getEmail());
        existingAccount.setPassword(account.getPassword());

        return accountRepository.save(existingAccount);
    }

    //xoa tai khoan
    @Transactional
    @Override
    public void deleteAccount(Long id) {
        if (!accountRepository.existsById(id)) {
            throw new IllegalArgumentException("Account not found");
        }
        accountRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account acc = accountRepository.findByAccountNameIgnoreCase(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + username));

        if (acc.getRole() == null) {
            throw new UsernameNotFoundException("User role not found: " + username);
        }

        return new org.springframework.security.core.userdetails.User(
                acc.getAccountName(),
                acc.getPassword(),
                Collections.singletonList(
                        new SimpleGrantedAuthority("ROLE_" + acc.getRole().getRoleName())
                )
        );
    }

    @Override
    public AccountResponseDTO getUserDTO(String username) {
        Account acc = accountRepository.findByAccountNameIgnoreCase(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + username));

        AccountResponseDTO dto = new AccountResponseDTO();
        dto.setId(acc.getId());
        dto.setName(acc.getAccountName());
        dto.setEmail(acc.getEmail());
        dto.setPassword(acc.getPassword());
        dto.setRoleName(acc.getRole().getRoleName());
        return dto;
    }

    @Override
    public ForgetPassworDTO getForgetPassword(String email) {
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        ForgetPassworDTO dto = new ForgetPassworDTO();
        dto.setPassword(account.getPassword());

        return dto;
    }
}
