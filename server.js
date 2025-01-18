const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai'); // Corrected import
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.listen(8000, () => console.log("server started"));

// Instantiate OpenAIApi correctly
const openai = new OpenAIApi(
    new Configuration({
        apiKey: "YOUR_API_KEY", // Ensure you replace this with your actual API key
    })
);

/**
 * Create the API endpoint for code debugger
 */
app.post("/debug", async (req, res) => {
    const { code, language } = req.body;
    
    try {
        // Make a call to OpenAI to debug the code
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `You are a code debugging assistant specializing in ${language}.`
                },
                {
                    role: 'user',
                    content: `Please debug the following ${language} code:\n\n${code}`
                }
            ]
        });

        // Send back the response from OpenAI
        res.json(response.data);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
});
