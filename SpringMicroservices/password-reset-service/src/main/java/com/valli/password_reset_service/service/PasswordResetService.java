package com.valli.password_reset_service.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import com.valli.password_reset_service.feign.UserInterface;
import com.valli.password_reset_service.model.PasswordResetToken;
import com.valli.password_reset_service.model.User;
import com.valli.password_reset_service.repository.PasswordResetRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;



@Service
public class PasswordResetService {

	@Autowired
	UserInterface userInterface;
	
	@Autowired
	PasswordResetRepository passwordResetRepository;
	
	@Autowired
	private JavaMailSender mailSender;
	
	public ResponseEntity<Object> resetRequest(String email) {
		User user=userInterface.getUserByEmail(email).getBody();
		if(user==null) {
			return new ResponseEntity<Object>("User not found",HttpStatus.BAD_REQUEST);
		}
		PasswordResetToken resetToken=passwordResetRepository.findByUser(user);
		String token = UUID.randomUUID().toString();
		if(resetToken!=null) {
			resetToken.setToken(token);
			resetToken.setExpiryDate(resetToken.calculateExpiryDate(15));
			passwordResetRepository.save(resetToken);
		}
		else {
		PasswordResetToken passwordResetToken=new PasswordResetToken(token,user);
		passwordResetRepository.save(passwordResetToken);
		}
		String resetUrl = "http://localhost:3000/reset-password/" + token;
		MimeMessage mimeMessage=mailSender.createMimeMessage();
		try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setTo(email);
            helper.setSubject("Reset your password.");
            String htmlContent = "<p>Hello," + user.getFirstName()+"</p>" +
                                 "<p><strong> Your Link to reset password is: </strong>" + resetUrl + "</p>" +
                                 "<p>Please use this link to update your password.</p>" +
                                 "<p>Thank you!</p>";
            helper.setText(htmlContent, true); // true indicates HTML content
            mailSender.send(mimeMessage);
            return new ResponseEntity<Object>("success",HttpStatus.OK);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
		return new ResponseEntity<Object>("Fail",HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<Object> resetPassword(String token, String newPassword) {
		try {
			PasswordResetToken resetToken=passwordResetRepository.findByToken(token);
			System.out.println(resetToken);
			if (resetToken == null || resetToken.isExpired()) {
	            System.out.println("Error");
				return new ResponseEntity<Object>("Token invalid or expired",HttpStatus.BAD_REQUEST);
	        }
			Object statuString=userInterface.updatePassword(resetToken.getUser().getId(), newPassword).getBody();
			System.out.println("Hello"+statuString);
			passwordResetRepository.delete(resetToken);
			return new ResponseEntity<Object>("success",HttpStatus.OK);
		}catch (Exception e) {
			System.out.println(e);
			e.printStackTrace();
		}
		return new ResponseEntity<Object>("Fail",HttpStatus.BAD_REQUEST);
	}

}
