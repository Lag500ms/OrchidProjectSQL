package org.orchids.orchidbe.service;

import org.orchids.orchidbe.dto.AccountRequestDTO;
import org.orchids.orchidbe.dto.AccountResponseDTO;
import org.orchids.orchidbe.dto.ForgetPassworDTO;
import org.orchids.orchidbe.pojo.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface UserDetailsService {

    //danh sach tai koan de quan ly
    Page<AccountResponseDTO> getAccounts(Pageable pageable, String keywords);

    //tao tai khoan
    @Transactional
    Account createAccount(AccountRequestDTO account);

    //sua tai khoan
    @Transactional
    Account updateAccount(Long id, AccountRequestDTO account);

    //xoa tai khoan
    @Transactional
    void deleteAccount(Long id);

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    AccountResponseDTO getUserDTO(String username);

    ForgetPassworDTO getForgetPassword(String email);
}
