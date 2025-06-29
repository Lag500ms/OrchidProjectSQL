package org.orchids.orchidbe.config;

import lombok.RequiredArgsConstructor;
import org.orchids.orchidbe.pojo.Category;
import org.orchids.orchidbe.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CategoryDataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public void run(String... args) {
        if (categoryRepository.count() > 0) {
            return;
        }

        List<String> predefinedCategories = List.of(
                "Cattleya Alliance",
                "Dendrobium",
                "Miltoniopsis",
                "Neofinetia",
                "Oncidiinae",
                "Paphiopedilum",
                "Phalaenopsis",
                "Phragmipedium",
                "Other Orchids"
        );

        predefinedCategories.forEach(name -> {
            Category category = new Category();
            category.setName(name);
            categoryRepository.save(category);
        });
    }
}