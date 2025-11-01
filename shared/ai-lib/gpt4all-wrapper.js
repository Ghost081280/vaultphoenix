// shared/ai-lib/gpt4all-wrapper.js

export async function askPhoenixAI(question) {
  try {
    // Try the local offline AI first (Muhammad's server)
    const offlineResponse = await fetch('/api/ask_offline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });

    const offlineData = await offlineResponse.json();

    if (offlineData && offlineData.answer) {
      return offlineData.answer;
    }

    // If offline AI can't answer, fall back to Claude
    const claudeResponse = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });

    const claudeData = await claudeResponse.json();

    // Send Claude’s answer back to the server to learn for next time
    await fetch('/api/save_learning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        answer: claudeData.answer
      })
    });

    return claudeData.answer;
  } catch (err) {
    console.error('Phoenix AI Error:', err);
    return "Sorry, I'm having trouble reaching my brain right now.";
  }
}
