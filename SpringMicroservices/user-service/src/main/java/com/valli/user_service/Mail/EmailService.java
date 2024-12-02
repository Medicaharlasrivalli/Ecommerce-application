package com.valli.user_service.Mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp,String name) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setTo(to);
            helper.setSubject("Your OTP Code");
            String htmlContent = "<p>Hello," + name+"</p>" +
                                 "<p>Your OTP code is: <strong>" + otp + "</strong></p>" +
                                 "<p>Please use this code to complete your verification.</p>" +
                                 "<p>Thank you!</p>";
            helper.setText(htmlContent, true); // true indicates HTML content
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
