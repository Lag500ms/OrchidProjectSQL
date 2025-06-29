package org.orchids.orchidbe.config;

import lombok.RequiredArgsConstructor;
import org.orchids.orchidbe.pojo.Orchid;
import org.orchids.orchidbe.repository.CategoryRepository;
import org.orchids.orchidbe.repository.OrchidRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class OrchidDataInitializer implements CommandLineRunner {
    private final OrchidRepository orchidRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public void run(String... args) {
        if (orchidRepository.count() > 0) {
            return;
        }

        addOrchid(true, "Mô tả hoa lan đẹp", "A", "https://th.bing.com/th/id/R.25752facab011bbfabe65b6ad774eeba?rik=ouvgAbjDwMx1gQ&pid=ImgRaw&r=0", 1000000.0, "Cattleya Alliance");
        addOrchid(false, "Lan rừng tự nhiên", "B", "https://th.bing.com/th/id/R.25752facab011bbfabe65b6ad774eeba?rik=ouvgAbjDwMx1gQ&pid=ImgRaw&r=0", 2500000.0, "Cattleya Alliance");
        addOrchid(true, "Lan rừng tự nhiên", "C", "https://th.bing.com/th/id/R.25752facab011bbfabe65b6ad774eeba?rik=ouvgAbjDwMx1gQ&pid=ImgRaw&r=0", 2500000.0, "Cattleya Alliance");
        addOrchid(true, "Lan rừng tự nhiên", "D", "https://th.bing.com/th/id/R.25752sacab011bbfabe65b6ad774eeba?rik=ouvgAbjDwMx1gQ&pid=ImgRaw&r=0", 2500000.0, "Phragmipedium");
        addOrchid(false, "Lan rừng tự nhiên", "E", "https://th.bing.com/th/id/R.25752facab011bbfabe65b6ad774eeba?rik=ouvgAbjDwMx1gQ&pid=ImgRaw&r=0", 2500000.0, "Cattleya Alliance");
        addOrchid(true, "Lan rừng tự nhiên", "F", "https://th.bing.com/th/id/R.25752facab011bbfabe65b6ad774eeba?rik=ouvgAbjDwMx1gQ&pid=ImgRaw&r=0", 2500000.0, "Phragmipedium");
        addOrchid(false, "Lan rừng tự nhiên", "G", "https://th.bing.com/th/id/R.25752facab011bbfabe65b6ad774eeba?rik=ouvgAbjDwMx1gQ&pid=ImgRaw&r=0", 2500000.0, "Cattleya Alliance");
    }

    private void addOrchid(Boolean isNatural, String description, String name,
                           String orchidUrl, Double price, String category) {
        Orchid orchid = new Orchid();
        orchid.setIsNatural(isNatural);
        orchid.setDescription(description);
        orchid.setName(name);
        orchid.setOrchidUrl(orchidUrl);
        orchid.setPrice(price);
        orchid.setCategory(categoryRepository.findByNameContainingIgnoreCase(category)
                .orElseThrow(() -> new RuntimeException("Category not found: " + category)));
        orchidRepository.save(orchid);
        System.out.println("Added orchid: " + name);
    }
}