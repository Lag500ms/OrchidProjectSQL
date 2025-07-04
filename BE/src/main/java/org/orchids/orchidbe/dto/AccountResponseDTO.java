package org.orchids.orchidbe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String roleName;
}
