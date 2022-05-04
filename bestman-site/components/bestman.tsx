import React from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";


const CopyKitt: React.FC = () => {
  const CHARACTER_LIMIT: number = 32;
  const ENDPOINT: string =
    "https://2iuf8acbwl.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_and_keywords";
  const [prompt, setPrompt] = React.useState("");  // ^^link above is from my cdk deploy to aws 
  const [snippet, setSnippet] = React.useState("");   
  const [keywords, setKeywords] = React.useState([]);
  const [hasResult, setHasResult] = React.useState(false); //anytime we store information and need to update the state we use a hook
  const [isLoading, setIsLoading] = React.useState(false); //result and loading are both set to false by default becasue they are false before anything happens

  const onSubmit = () => {  // on submit is what makes the submit button work
    console.log("Submitting: " + prompt);
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}`)  //set the endpoint above so code is cleaner
      .then((res) => res.json())  // need to change it to json so we can get the data from response body
      .then(onResult);
  };

  const onResult = (data: any) => {  // the onresult ties our hooks together, since it is the result
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setHasResult(true);
    setIsLoading(false);
  };

  const onReset = () => {
    setPrompt("");
    setHasResult(false);
    setIsLoading(false);
  };

  let displayedElement = null;

  if (hasResult) {   //displayed element is set to null by default and this if statement checks for it
    displayedElement = (
      <Results
        snippet={snippet}
        keywords={keywords}
        onBack={onReset}
        prompt={prompt}
      />
    );
  } else {
    displayedElement = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        isLoading={isLoading} // this line of code disbales the submit button whether the prompt is not valid or you have just submitted something(prevents the button being spammed)
        characterLimit={CHARACTER_LIMIT}
      />
    );
  }

  const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto";

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-slate-800 p-6 rounded-md text-white">
          <div className="text-center my-6">
            <Image src={logo} width={42} height={42} />
            <h1 className={gradientTextStyle + " text-3xl font-light"}>
              BestMan
            </h1>
            <div className={gradientTextStyle}>The BestMan for AI Branding</div>
          </div>

          {displayedElement}
        </div>
      </div>
    </div>
  );
};

export default BestMan;