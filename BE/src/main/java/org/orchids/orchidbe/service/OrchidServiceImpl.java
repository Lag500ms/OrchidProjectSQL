package org.orchids.orchidbe.service;

import org.orchids.orchidbe.dto.OrchidCreateDTO;
import org.orchids.orchidbe.dto.OrchidRequestDTO;
import org.orchids.orchidbe.dto.OrchidResponseDTO;
import org.orchids.orchidbe.pojo.Orchid;
import org.orchids.orchidbe.repository.CategoryRepository;
import org.orchids.orchidbe.repository.OrchidRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class OrchidServiceImpl implements OrchidService{
    private final OrchidRepository orchidRepository;
    private final CategoryRepository categoryRepository;

    public OrchidServiceImpl(OrchidRepository orchidRepository, CategoryRepository categoryRepository) {
        this.orchidRepository = orchidRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Page<OrchidResponseDTO> getOrchids(Pageable pageable, String keywords) {
        Page<Orchid> orchidsPage;

        if (keywords == null || keywords.isBlank()) {
            orchidsPage = orchidRepository.findAll(pageable);
        } else {
            orchidsPage = orchidRepository.findBynameContainingIgnoreCase(keywords, pageable);
        }

        return orchidsPage.map(orchid -> {
            OrchidResponseDTO dto = new OrchidResponseDTO();
            dto.setId(orchid.getId());
            dto.setName(orchid.getName());
            dto.setDescription(orchid.getDescription());
            dto.setPrice(orchid.getPrice());
            dto.setImageUrl(orchid.getOrchidUrl());
            dto.setCategoryName(orchid.getCategory() != null ? orchid.getCategory().getName() : null);
            return dto;
        });
    }

    @Override
    public void deleteOrchid(Long id) {
        orchidRepository.deleteById(id);
    }

    @Override
    public OrchidResponseDTO getOrchidById(Long id) {
        Orchid orchid = orchidRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orchid not found with id: " + id));

        OrchidResponseDTO dto = new OrchidResponseDTO();
        dto.setId(orchid.getId());
        dto.setName(orchid.getName());
        dto.setDescription(orchid.getDescription());
        dto.setImageUrl(orchid.getOrchidUrl());
        dto.setPrice(orchid.getPrice());
        dto.setIsNatural(orchid.getIsNatural());
        dto.setCategoryName(
                orchid.getCategory() != null ? orchid.getCategory().getName() : null
        );

        return dto;
    }


    @Override
    public Orchid updateOrchid(Long id, OrchidRequestDTO updatedOrchid) {
        Orchid existingOrchid = orchidRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orchid not found with id: " + id));
        if (updatedOrchid.getIsNatural() != null) {
            existingOrchid.setIsNatural(updatedOrchid.getIsNatural());
        }
        if (updatedOrchid.getDescription() != null) {
            existingOrchid.setDescription(updatedOrchid.getDescription());
        }
        if (updatedOrchid.getName() != null) {
            existingOrchid.setName(updatedOrchid.getName());
        }
        if (updatedOrchid.getOrchidUrl() != null) {
            existingOrchid.setOrchidUrl(updatedOrchid.getOrchidUrl());
        }
        if (updatedOrchid.getPrice() != null) {
            existingOrchid.setPrice(updatedOrchid.getPrice());
        }
        if (updatedOrchid.getCategory() != null) {
            existingOrchid.setCategory(updatedOrchid.getCategory());
        }
        return orchidRepository.save(existingOrchid);
    }

    @Override
    public Orchid createOrchid(OrchidCreateDTO orchidDTO) {
        Orchid orchid = new Orchid();
        orchid.setName(orchidDTO.getName());
        orchid.setDescription(orchidDTO.getDescription());
        orchid.setIsNatural(orchidDTO.getIsNatural());
        orchid.setOrchidUrl(orchidDTO.getOrchidUrl());
        orchid.setPrice(orchidDTO.getPrice());
        orchid.setCategory(categoryRepository.findById(orchidDTO.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found with id: " + orchidDTO.getCategoryId())));
        return orchidRepository.save(orchid);
    }

}
