Go to your EmailJS dashboard
Go to Email Services and add your email service (Gmail is commonly used)
Note down your Service ID

Click on "Email Templates" in the left sidebar
Click "Create New Template"
Use this HTML template:

<!DOCTYPE html>
<html>
<head>
    <title>New Feedback Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4A90E2;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            background-color: #f9f9f9;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
        }
        .rating {
            color: #F5A623;
            font-size: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Feedback Received</h1>
        </div>
        <div class="content">
            <p><strong>From:</strong> {{from_name}} ({{from_email}})</p>
            <p><strong>Rating:</strong> <span class="rating">{{rating}} / 5</span></p>
            <p><strong>Message:</strong></p>
            <p>{{message}}</p>
        </div>
        <div class="footer">
            <p>This is an automated message from your feedback form.</p>
        </div>
    </div>
</body>
</html>

Save the template and note down the Template ID
Go to Account > API Keys and copy your Public Key

Update the useEmailSender.ts file with your credentials:
