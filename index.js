const express = require('express');
const app = express();
const port =3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });
const connection= mongoose.connection;
connection.once('open', () => {
    
});
 const transaltionschema= new mongoose.Schema({
  text: String,
  description: String,
  });
  const Translation = mongoose.model('Translation', transaltionschema);

  const dictionary={
    "hello": {fr:"bonjour",es:"hola"},
    "goodbye": {fr:"au revoir",es:"adiós"},
    "good morning": {fr:"bonjour",es:"buenos días"}
    

    }
    app.post("/translate", async (req, res) => {
      const { text, language } = req.body;
  
      if (!dictionary[text] || !dictionary[text][language]) {
          return res.json({ translatedText: "Translation not found" });
      }
  
      const translatedText = dictionary[text][language];
  
      // Save to database
      const newTranslation = new Translation({ originalText: text, translatedText, language });
      await newTranslation.save();
  
      res.json({ translatedText });
  });
  
  // Get Previous Translations
  app.get("/translations", async (req, res) => {
      const translations = await Translation.find();
      res.json(translations);
  });
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
