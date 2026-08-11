export default async function Grammar(message : String, type : String) : Promise<String | undefined>
{
    try
    {
        const response = await fetch("http://localhost:8080/" + type, {method: "POST", 
                                                                          headers:{"Content-Type": "application/json"}, 
                                                                          body:JSON.stringify({grammarFix: message})});

        if(!response.ok)
        {
            throw new Error("Something is wrong with the connection");
        }
        const data = await response.json();
        const results = data["correctGrammer"]
        return results
    }
    catch(error)
    {
        console.log(error);
        return undefined;
    }   
}