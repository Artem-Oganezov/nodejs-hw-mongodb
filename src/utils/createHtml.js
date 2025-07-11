export const createHtml = (name, link) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Reset Request</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>
 <p>Hello, ${name}</p>
 <p>
    <a href="${link}" >Reset Your Password</a>
 </p>
 <p>If you didn't request this, just ignore this email.</p>
</body>
</html>`;
};
