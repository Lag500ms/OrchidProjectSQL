package org.orchids.orchidbe.config;

import lombok.RequiredArgsConstructor;
import org.orchids.orchidbe.pojo.Role;
import org.orchids.orchidbe.repository.RoleRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class RoleDataInitializer implements ApplicationRunner {

    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (roleRepository.count() > 0) {
            return;
        }

        addRole("ADMIN");
        addRole("USER");
    }

    private void addRole(String roleName) {
        Role role = new Role();
        role.setRoleName(roleName);
        roleRepository.save(role);
        System.out.println("Added role: " + roleName);
    }
}