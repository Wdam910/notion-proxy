// api/test-notion.js
export default async function handler(req, res) {
  // 테스트용 DB ID (게시글 DB 기준)
  const databaseId = "2d3b037b31cc80cf894ee5196d39b792";

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
        body: JSON.stringify({ page_size: 1 }) // 테스트용으로 1개만 가져오기
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: await response.text() });
    }

    const data = await response.json();
    res.status(200).json(data); // DB 내용 일부 반환
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
