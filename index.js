const express = require("express");
const app = express();
const port = 3000;

const router = require("./main");

app.use(express.static("public"));
app.use("/" ,router  );
app.use("/home" ,router  );
app.use("/books" ,router  );
app.use("/books/:id" ,router  );
app.use("/booksList" ,router  );
app.use("/book" ,router  );
app.use("/search_books" ,router  );
app.use("/admin" ,router  ); 
app.use("/edit" ,router  ); 
app.use("/delete" ,router  ); 
app.use("/saveedit" ,router  );
app.use("/insert" , router); 
app.use("/saveadd" ,router  );

app.use((req, res, next) => {
  res.status(404).render( "../views/404.ejs"  );
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

