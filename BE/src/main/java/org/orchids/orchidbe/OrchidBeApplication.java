package org.orchids.orchidbe;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan
public class OrchidBeApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(OrchidBeApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

    }
}
