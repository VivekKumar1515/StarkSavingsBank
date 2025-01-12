
# Stark Savings Bank (Web Security Project)

**Welcome to Stark Savings Bank** – a fortress of financial security built as meticulously as *The Wall* itself! Inspired by the noble houses of Westeros, this Game of Thrones-themed banking application ensures the highest standards of **data privacy and security**, rivaling the protection of the most formidable strongholds in the Seven Kingdoms.

This production-ready web application is crafted to safeguard your wealth and personal data with the vigilance of the *Night's Watch*. Whether you're securing your *gold dragons* or managing *Iron Bank loans*, Stark Savings Bank promises a seamless, trustworthy experience, fortified with cutting-edge security.

Join us in our journey, where your treasures and secrets are as secure as a vault beneath the *Red Keep*.

## Features

- **JWT-based Authentication and Authorization**: Ensuring secure and stateless sessions.
- **Role-based Access Control (RBAC)**: Enabling Admin and Customer roles for proper access management.
- **Password and Data Encryption**: Using Bcrypt hashing to protect sensitive data.
- **Input Validation**: Frontend validation combined with Backend Bean Validation to ensure data integrity.
- **Protection Against Common Attacks**: Safeguarding the platform from Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF).
- **Transactional Email Service**: Secure communication for actions such as Password Reset, Registration, and Post-registration.
- **Comprehensive API Documentation**: Fully compliant with OpenAPI 3.0 to streamline backend integration.

## Tech Stack

**Client:** Next.js, Framer-Motion, Axios, Tailwind CSS

**Server:** Spring Framework, Spring Boot, Spring Security, Lombok, Spring Data JPA, Hibernate Validator, Java Mail Sender

**Database:** PostgreSQL

**Development Tools:** IntelliJ IDEA, VS Code, Postman, Docker, Git, Swagger UI

## API Reference

For detailed API documentation, please refer to the OpenAPI 3.0 specification file available at the following link:

[Stark Savings Bank API Documentation (OpenAPI 3.0)](https://github.com/VivekKumar1515/StarkSavingsBank/blob/main/StarkSavingsBank-Backend/src/main/resources/static/openapi.json)

### How to Use:
1. **Download the OpenAPI JSON file**:
   - Visit the link above and download the `openapi.json` file to your local machine.

2. **Generate API Documentation**:
   - Use any OpenAPI 3.0 compatible documentation generator to visualize and interact with the API. A popular option is [Swagger UI](https://swagger.io/tools/swagger-ui/).
   
   - To use Swagger UI:
     1. Navigate to the [Swagger UI website](https://swagger.io/tools/swagger-ui/).
     2. Choose "Explore" or "Try it out."
     3. Upload the downloaded `openapi.json` file or provide its URL within Swagger UI.
   
   - This JSON can also be integrated with other tools that support OpenAPI 3.0 specifications.

## Run Locally

### Clone the Project

```bash
git clone https://github.com/VivekKumar1515/StarkSavingsBank.git
```

### Backend Setup

1. Navigate to the backend project directory:

```bash
cd StarkSavingsBank/StarkSavingsBank-Backend/
```

2. Install Maven dependencies:

```bash
mvn clean install
```

3. Start Docker and run a PostgreSQL container or use a locally installed PostgreSQL instance. Update the `application.properties` file with your PostgreSQL credentials.

   Example `application.properties`:

   ```properties
   spring.application.name=${SPRING_APP_NAME:StarkSavingsBankbackend}
   logging.level.org.springframework.security=${SPRING_SECURITY_LOG_LEVEL:TRACE}
   spring.config.import=application_prod.properties
   spring.profiles.active=default
   spring.datasource.url=jdbc:postgresql://${DATABASE_HOST:localhost}:${DATABASE_PORT:5432}/${DATABASE_NAME:postgres}
   spring.datasource.username=${DATABASE_USERNAME:root}
   spring.datasource.password=${DATABASE_PASSWORD:root}
   spring.jpa.show-sql=${JPA_SHOW_SQL:true}
   spring.jpa.hibernate.ddl-auto=update
   server.servlet.session.timeout=${SERVER_SESSION_TIMEOUT:5m}
   spring.mail.host=smtp.gmail.com
   spring.mail.port=587
   spring.mail.username=your-email@example.com
   spring.mail.password=your-email-password
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.starttls.enable=true
   ```

4. Run the Spring Boot application:

```bash
mvn spring-boot:run
```

---

### Frontend Setup

1. Navigate to the frontend project directory:

```bash
cd StarkSavingsBank/StarkSavingsBank-Frontend/starksavingsbank
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

---

🎉 **You're all set!** Your application is now running locally.

## Demo

Watch the demo video to see Stark Savings Bank in action:

[![Watch the video](https://img.youtube.com/vi/_ZrUkfBwl-Y/maxresdefault.jpg)](https://youtu.be/_ZrUkfBwl-Y)

## Author

📧 Feel free to reach out to us through [Email](mailto:vivekvasu1515@gmail.com) for any inquiries, feedback, or collaboration opportunities related to **Stark Savings Bank** or other Game of Thrones-themed projects. Your thoughts and ideas are as valuable as the Iron Bank's gold! 🐺💰  

🚀 Together, let’s build a legacy worthy of the North!
