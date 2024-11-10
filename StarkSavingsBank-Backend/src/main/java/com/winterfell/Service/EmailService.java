package com.winterfell.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public boolean sendResetLink(String to, String resetLink) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setFrom("no-reply@yourdomain.com"); // Replace with your sender's email
            helper.setSubject("Password Reset Request");

            // HTML content for the email
            String content = String.format(
                    "<p>Hello,</p>" +
                            "<p>We received a request to reset your password. Click the link below to set a new password:</p>" +
                            "<p><a href='%s' style='color: #007bff; text-decoration: none;'>Reset Your Password</a></p>" +
                            "<p>If you did not request a password reset, you can ignore this email.</p>" +
                            "<p>Best regards,<br>Your Support Team</p>",
                    resetLink // Insert dynamic reset link
            );

            helper.setText(content, true); // true to enable HTML content

            mailSender.send(message);
            return true;
        } catch (MessagingException e) {
            System.out.println("Error occurred while sending mail due to: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }



    public boolean sendRegistrationLink(String email, String registrationLink) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setFrom("no-reply@starksavingsbank.com");
            helper.setSubject("⚔️ Welcome to Stark Savings Bank! Complete Your Registration ⚔️");

            // HTML content for the email
            String content = String.format(
                    "<p>Dear Patron,</p>" +
                            "<p>Congratulations on joining <b>Stark Savings Bank</b>! To embark on your journey with us, please complete your registration:</p>" +
                            "<p><a href='%s' style='color: #007bff; text-decoration: none;'>Complete Your Registration</a></p>" +
                            "<p>May your wealth be as strong as the North. Welcome to the family.</p>" +
                            "<p>Valar Dohaeris,<br>The Faceless Banker<br>Stark Savings Bank</p>",
                    registrationLink // Insert dynamic link
            );

            helper.setText(content, true); // Set to true to enable HTML

            mailSender.send(message);
            return true;
        } catch (MessagingException e) {
            System.out.println("Error occurred while sending mail due to: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }



    public boolean sendWelcomeEmail(String to, String registrationLink) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setFrom("no-reply@starksavingsbank.com"); // Set the sender's email address
        helper.setSubject("⚔️ Welcome to the Stark Savings Bank Realm! Your Journey Begins ⚔️");

        String content = String.format(
                "<p>Dear Noble Patron,</p>" +
                        "<p>Congratulations, brave soul! You have taken your first step into the esteemed halls of <b>Stark Savings Bank</b>, where loyalty is valued as much as gold, and every coin is as fierce as a direwolf’s howl. 🌌</p>" +
                        "<p>To make your mark in the realm, we need a few bold decisions from you:</p>" +
                        "<ul>" +
                        "<li><b>Choose Your Stronghold</b> 🏰 – Select your branch wisely, for it will be your fortress in times of need.</li>" +
                        "<li><b>Forge Your First Deposit</b> 💰 – Lay the foundation of your wealth in our vaults with an initial deposit.</li>" +
                        "<li><b>Claim Your Title</b> ⚜️ – Choose an account type that fits your ambitions, from <i>Ironborn Investor</i> to <i>Knight of Wealth</i>.</li>" +
                        "</ul>" +
                        "<p>Complete these quests to solidify your place among the esteemed members of Stark Savings Bank. Follow the link below to get started with your journey:</p>" +
                        "<p><a href='%s'>Complete Your Registration & Start Your Journey</a></p>" +
                        "<p>Valar Dohaeris,<br>The Faceless Banker<br>Stark Savings Bank</p>",
                registrationLink // Dynamic registration link

        );

        helper.setText(content, true); // true indicates HTML

        mailSender.send(message);
        return true;
    }

}
