package com.winterfell.repository;

import com.winterfell.model.Authorities;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthoritiesRepository extends JpaRepository<Authorities, Integer> {
}
