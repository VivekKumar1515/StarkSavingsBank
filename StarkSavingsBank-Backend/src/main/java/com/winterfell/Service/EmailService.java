package com.winterfell.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public boolean sendResetLink(String to, String resetLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        try {
            message.setTo(to);
            message.setSubject("Password Reset Request");
            message.setText("Click the following link to reset your password: " + resetLink);
            mailSender.send(message);
            return true;

        } catch (MailException mailException) {
            System.out.println("Error occurred while sending mail due to : " + mailException.getMessage());
            mailException.printStackTrace();
            return false;
        }
    }

    public boolean sendRegistrationLink(String email, String registrationLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        try {
            message.setTo(email);
            message.setSubject("Registration Link");
            message.setText("Click the following link to get to the registration page: " + registrationLink);
            mailSender.send(message);

            return true;
        } catch (MailException mailException) {
            System.out.println("Error occurred while sending mail due to : " + mailException.getMessage());
            mailException.printStackTrace();
            return false;
        }
    }
}
