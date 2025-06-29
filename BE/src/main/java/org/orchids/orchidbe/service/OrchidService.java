package org.orchids.orchidbe.service;

import org.orchids.orchidbe.dto.OrchidCreateDTO;
import org.orchids.orchidbe.dto.OrchidRequestDTO;
import org.orchids.orchidbe.dto.OrchidResponseDTO;
import org.orchids.orchidbe.pojo.Orchid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface OrchidService {
    //tao orchid
    Page<OrchidResponseDTO> getOrchids(Pageable pageable, String keywords);

    void deleteOrchid(Long id);

    OrchidResponseDTO getOrchidById(Long id);

    Orchid updateOrchid(Long id, OrchidRequestDTO updatedOrchid);

    Orchid createOrchid(OrchidCreateDTO orchidDTO);
}
