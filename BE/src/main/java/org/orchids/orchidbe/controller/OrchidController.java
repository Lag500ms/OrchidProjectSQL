package org.orchids.orchidbe.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.orchids.orchidbe.dto.OrchidCreateDTO;
import org.orchids.orchidbe.dto.OrchidRequestDTO;
import org.orchids.orchidbe.dto.OrchidResponseDTO;
import org.orchids.orchidbe.pojo.Orchid;
import org.orchids.orchidbe.service.OrchidService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orchids")
@SecurityRequirement(name = "bearerAuth")
public class OrchidController {
    private final OrchidService orchidService;

    public OrchidController(OrchidService orchidService) {
        this.orchidService = orchidService;
    }

    @GetMapping
    public ResponseEntity<?> getOrchids(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keywords) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OrchidResponseDTO> result = orchidService.getOrchids(pageable, keywords);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getOrchidById(@PathVariable Long id) {
        OrchidResponseDTO orchid = orchidService.getOrchidById(id);
        if (orchid != null) {
            return ResponseEntity.ok(orchid);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> createOrchid(@RequestBody OrchidCreateDTO orchid) {
        try {
            Orchid created = orchidService.createOrchid(orchid);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> updateOrchid(@RequestBody OrchidRequestDTO updatedOrchid, @PathVariable Long id) {
        try {
            Orchid updated = orchidService.updateOrchid(id, updatedOrchid);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> deleteOrchid(@PathVariable Long id) {
        try {
            orchidService.deleteOrchid(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
