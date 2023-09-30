const express = require("express")
const fs = require("fs").promises;
const path = require("path")


const router = express.Router()

// Recursive function to list files and directories with URLs
async function listFilesAndDirectories(folderPath, parentUrl) {
  const entries = await fs.readdir(folderPath);
  const fileDetails = [];

  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry);
    const stats = await fs.stat(entryPath);

    const entryUrl = path.join(parentUrl, entry);

    if (stats.isDirectory()) {
      const subDirectoryFiles = await listFilesAndDirectories(entryPath, entryUrl);
      fileDetails.push({
        name: entry,
        isDirectory: true,
        url: entryUrl,
        contents: subDirectoryFiles,
      });
    } else {
      fileDetails.push({
        name: entry,
        isDirectory: false,
        size: stats.size,
        url: entryUrl,
      });
    }
  }

  return fileDetails;
}

router.get("/getFiles", async (req, res) => {
  const folderPath = "C://kafka_project//flask-routings"; // Change this to the folder you want to list
  const baseUrl = 'C://kafka_project//flask-routings' //req.protocol + "://" + req.get("host"); // Get the base URL

  try {
    const fileDetails = await listFilesAndDirectories(folderPath, baseUrl);
    res.json(fileDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to retrieve file list" });
  }
});

module.exports = router //need to export this as we are supposed to use this in different places