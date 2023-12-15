import sendEmail from "../services/emailService.js";

const defineEndpoints = (app) => {
  app.post("/send-email", async (req, res) => {
    console.log(req.body);
    const { name, email, subject, message, organization } = req.body;

    const result = await sendEmail({ name, email, subject, message, organization });

    if (result.success) {
      res.status(200).send(result.message);
    } else {
      res.status(500).send(result.message);
    }
  });

  app.get("/", (req, res) => {
    console.log("Bienvenido!!");
    res.send("Welcome!!");
  });
};

export default defineEndpoints ;