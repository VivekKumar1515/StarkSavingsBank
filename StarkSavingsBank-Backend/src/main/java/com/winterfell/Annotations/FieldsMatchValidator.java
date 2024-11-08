package com.winterfell.Annotations;

import com.winterfell.Validations.FieldsMatchValidation;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = FieldsMatchValidation.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface FieldsMatchValidator {
    String message() default "Fields do not match!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String field();

    String matchField();


    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface List {
        FieldsMatchValidator[] value();
    }
}

