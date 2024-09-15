import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "o1-preview",
    messages: [
        { role: "system", content: "You are a game designer using Pygame." },
        {
            role: "user",
            content: {input},
        },
    ],
});

console.log(completion.choices[0].message);