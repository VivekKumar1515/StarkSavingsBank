package com.winterfell;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EntityScan(basePackages = "com.winterfell.model")
@EnableJpaRepositories(basePackages = "com.winterfell.repository")
public class StarkSavingsBankBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(StarkSavingsBankBackendApplication.class, args);
    }

}
