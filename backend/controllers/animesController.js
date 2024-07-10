const express = require("express");
const animes = express.Router();
const {
  getAllAnimes,
  getOneAnime,
  createOneAnime,
  updateOneAnime,
  deleteOneAnime,
} = require("../queries/animes");


function validateAnime(body) {

  if (!body.name || !body.description) {
    res.status(400).json({ payload: "Error, no name or password!" });
  }else{
    return "validation error";
  }
}

/* Instructions: Use the following prompts to write the corresponding routes. **Each** route should be able to catch server-side and user input "error"s(should they apply). Consult the test files to see how the routes and "error"s should work.*/

//Write a GET route that retrieves all animes from the database and sends them to the client with a 200 status code

animes.get("/", async (req, res) => {
  try {
    const allAnimes = await getAllAnimes();
    res.status(200).json(allAnimes);
  } catch {
    res.status(404).json({ payload: "error" });
  }
});

//Write a POST route that takes user provided data from the request body and creates a new anime in the database. The route should respond with a 200 status code and the new anime.
//if the request body does not contain a name and description, or if the body's name or description have no length, respond with an "error"
animes.post("/", async (req, res) => {
  const body = req.body;

  try {
    // const validAnime = validateAnime(body);
    // // if there is "error" then return "Error"
    // if (validAnime == "validation error") {
    //   res.status(404).json({ payload: "error" });
    // }

    const newAnime = await createOneAnime(body);
    res.status(200).json(newAnime);
  } catch (e) {
    res.status(404).json({ payload: e });
  }
});

//Write a PUT route that takes user provided data from the request body and updates an existing anime in the database. The route should respond with a 200 and the updated anime. The route should be able to handle a non-existent anime id.
//if the request body does not contain a name and description, or if the body's name or description have no length, respond with an "error"

animes.put("/:animeId", async (req, res) => {
  const { animeId } = req.params;
  const body = req.body;
  try {
    // const validAnime = validateAnime(body);

    // // if there is "error" then return "Error"
    // if (validAnime == "validation error") {
    //   res.status(404).json({ payload: "error" });
    // }

    const updateAnime = await updateOneAnime(animeId, body);
    res.status(200).json(body);
  } catch (e) {
    res.status(404).json({ payload: e });
  }
});

//Write a DELETE route that deletes a single anime by id (provided by the client as a request param) from the database and responds with a 200 and the deleted anime data. The route should be able to handle a non-existent anime id.

animes.delete("/:animeId", async (req, res) => {
  const { animeId } = req.params;

  try {

    const deleteAnime = await deleteOneAnime(animeId);
    res.status(200).json(deleteAnime);
  } catch (e) {
    res.status(404).json({ payload: e });
  }
});

module.exports = animes;


