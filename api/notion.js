// api/notion.js
export default async function handler(req, res) {
  // 4개의 DB ID
  const dbMap = {
    character: "2d3b037b31cc8052bcdec1d6eefb1cd1",
    music: "2d3b037b31cc80b79515e7a3af049880",
    post: "2d3b037b31cc80cf894ee5196d39b792",
    guestbook: "2d3b037b31cc8039a242da1699960a01"
  };

  const results = {};

  // 각 DB를 순서대로 가져오기
  for (const [key, databaseId] of Object.entries(dbMap)) {
    try {
      const response = await fetch(
        `https://api.notion.com/v1/databases/${databaseId}/query`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({}) // 빈 body
        }
      );

      if (!response.ok) {
        results[key] = { error: `Failed to fetch ${key} DB: ${response.status}` };
        continue;
      }

      results[key] = await response.json();
    } catch (err) {
      results[key] = { error: err.message };
    }
  }

  // 4개 DB 데이터를 JSON 형태로 반환
  res.status(200).json(results);
}
