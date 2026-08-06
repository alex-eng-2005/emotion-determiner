export default async function Emotion(message : String)
{
  
    //Sends a response
      const response = await fetch(
        "http://192.168.56.1:8000/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            text: message,
          }),
        }
      );

      //Response is an error
      if(!response.ok)
      {
        throw new Error("Python server returned an error");
      }

      //Gets the data
      const data = await response.json();
      //My Emotion
      const emotion : JSON[] = data.userEmotions[0];
      //Sarcasm
      const sarcasm : JSON = data.userEmotions[1];

      return [emotion, sarcasm]
}