package com.winterfell.repository;

import com.winterfell.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmail(String email);

    Boolean existsByEmail(String email);


    @Modifying
    @Transactional
    @Query(value = "UPDATE customer SET pwd = :password WHERE email = :email", nativeQuery = true)
    int updatePassword(@Param("email") String email, @Param("password") String password);
}
