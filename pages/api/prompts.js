// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    prompts: [
      { content: "What’s your biggest fear?" },
      { content: "What would your superpower be?" },
      { content: "What’s your spirit animal and why?" },
      {
        content:
          "What’s the topic you’re most looking forward to learning about on the course?",
      },
      { content: "Tell us about your first job" },
    ],
  });
}
