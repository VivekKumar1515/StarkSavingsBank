package com.winterfell;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.annotations.OpenAPI30;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EntityScan(basePackages = "com.winterfell.model")
@EnableJpaRepositories(basePackages = "com.winterfell.repository")
@OpenAPIDefinition(info = @Info(
        title = "Stark Savings Bank API Documentation"
))
public class StarkSavingsBankBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(StarkSavingsBankBackendApplication.class, args);
    }

}
