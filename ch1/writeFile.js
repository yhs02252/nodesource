import fs from "fs";

fs.writeFile("./writeme.txt", "글을 작성합니다", (err) => {
  if (err) {
    throw err;
  }

  //  작성한 글 불러와서 읽기
  fs.readFile("./writeme.txt", (err, data) => {
    if (err) throw err;
    console.log(data.toString());
  });
});
