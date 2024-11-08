package com.winterfell.model;

import com.winterfell.Annotations.FieldsMatchValidator;

@FieldsMatchValidator(
        field = "password",
        matchField = "confirmPassword"
)
public record ResetRequestDTO(String password, String confirmPassword) {
}
