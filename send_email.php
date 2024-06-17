<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input data to prevent XSS attacks
    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email format";
        exit;
    }

    // Set recipient email address
    $to = "timrishellr@gmail.com"; // Replace with your own email address

    // Email subject
    $subject = "New Contact Form Submission";

    // Email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Message:\n$message\n";

    // Email headers
    $headers = "From: $name <$email>";

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo "Message sent successfully!";
    } else {
        http_response_code(500);
        echo "Failed to send message. Please try again later.";
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo "Method not allowed";
}

?>
