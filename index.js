const express = require("express");
const app = express();
const port = 4000 || process.env.PORT;
const expressHds = require("express-handlebars");

app.use(express.static(__dirname + "/html"));

app.engine(
  "hbs",
  expressHds.engine({
    layoutDir: __dirname + "/views/layouts",
    partialDir: __dirname + "/views/partials",
    extname: "hbs",
    defaultLayout: "layout",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      showDate: (date) => {
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
      for: (from, to, incr, block) => {
        let accum = '';
        for(let i = from; i <= to; i += incr)
          accum += block.fn(i);
        return accum;
      }
    },
  })
);

app.set("view engine", "hbs");

app.get("/", (req, res) => res.redirect("/blogs"));
app.use("/blogs", require("./routes/blogRouter"));

// app.get("/createTables", (req, res) => {
//   let models = require("./models");
//   models.sequelize.sync().then(() => {
//     res.send("Table created!");
//   });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}`));
