import express from "express"
import nodemailer from "nodemailer"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Backend works")
})

app.post("/send-email", async (req, res) => {
  console.log("BODY:", req.body)

  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Missing name, email or message",
    })
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "raikovpresiyan@gmail.com",
      pass: "qzqk jksx tclj qxsg",
    },
  })

  try {
    await transporter.sendMail({
      from: "yourgmail@gmail.com",
      replyTo: email,
      to: "yourgmail@gmail.com",
      subject: "Ново запитване от сайта",
      text: `Име: ${name}\nИмейл: ${email}\n\nСъобщение:\n${message}`,
    })

    res.json({ success: true })
  } catch (error) {
    console.error("MAIL ERROR:", error)
    res.status(500).json({ success: false, error: "Mail send failed" })
  }
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})