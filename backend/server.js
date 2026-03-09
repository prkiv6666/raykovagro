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
  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Missing fields",
    })
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      replyTo: email,
      to: process.env.GMAIL_USER,
      subject: "Ново запитване от сайта",
      text: `Име: ${name}\nИмейл: ${email}\n\nСъобщение:\n${message}`,
    })

    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})