const http = require("http");

http
  .get("http://localhost:3000", (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      console.log("STATUS", res.statusCode);
      const max = 8000;
      console.log("\n----- START HTML PREVIEW -----\n");
      console.log(data.slice(0, max));
      console.log("\n----- END HTML PREVIEW -----\n");

      const sections = [
        "skills",
        "certifications",
        "coding-platforms",
        "projects",
        "contact",
      ];
      sections.forEach((s) => {
        console.log(
          `${s}:`,
          data.includes(`id=\"${s}\"`) ||
            data.includes(`id='${s}'`) ||
            data.includes(`id=\"${s}\"`)
        );
      });
    });
  })
  .on("error", (err) => {
    console.error("ERROR", err.message);
  });
