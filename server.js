import express from 'express';
import course from './models/Course.js';


const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

app.set('view engine', 'ejs');

app.get("/", async function (req, res) {
  const ligne = await course.loadMany();
  res.render('listCourse.ejs', { ligne });
});

app.post("/add", async function (req, res) {
  const newligne = new course();
  newligne.name = req.body.name
  newligne.quantity = req.body.quantity
  newligne.purchased = 0
  await newligne.save();
  res.redirect('/');
});

app.get("/delete/:id", async function (req, res) {
  await course.delete({ id_item: req.params.id });
  res.redirect('/');
});

app.get("/bought/:id", async function(req,res){
  const ligne = await course.load({id_item : req.params.id})
  ligne.purchased = 1
  await ligne.save()
  res.redirect("/")
})

app.get("/achat", async function (req, res) {
  res.render('Ajout.ejs');
});



app.listen(80);
