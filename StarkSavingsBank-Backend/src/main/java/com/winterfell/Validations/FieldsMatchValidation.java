package com.winterfell.Validations;


import com.winterfell.Annotations.FieldsMatchValidator;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

public class FieldsMatchValidation implements ConstraintValidator<FieldsMatchValidator, Object> {

    String field;
    String matchField;

    /**
     * Initializes the validator in preparation for
     * {@link #isValid(Object, ConstraintValidatorContext)} calls.
     * The constraint annotation for a given constraint declaration
     * is passed.
     * <p>
     * This method is guaranteed to be called before any use of this instance for
     * validation.
     * <p>
     * The default implementation is a no-op.
     *
     * @param constraintAnnotation annotation instance for a given constraint declaration
     */
    @Override
    public void initialize(FieldsMatchValidator constraintAnnotation) {
        field = constraintAnnotation.field();
        matchField = constraintAnnotation.matchField();
    }

    /**
     * Implements the validation logic.
     * The state of {@code value} must not be altered.
     * <p>
     * This method can be accessed concurrently, thread-safety must be ensured
     * by the implementation.
     *
     * @param value   object to validate
     * @param context context in which the constraint is evaluated
     * @return {@code false} if {@code value} does not pass the constraint
     */
    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        Object fieldValue = new BeanWrapperImpl(value).getPropertyValue(field);
        Object matchFieldValue = new BeanWrapperImpl(value).getPropertyValue(matchField);
        if (fieldValue != null) {
            return fieldValue.equals(matchFieldValue);
        } else {
            return matchFieldValue == null;
        }
    }
}
